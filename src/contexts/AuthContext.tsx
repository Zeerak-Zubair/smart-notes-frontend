import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export interface AuthResponse {
  message: string;
  success: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
}

export interface AuthContextType {
  authData: AuthResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authResponse: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "smart_notes_auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth data from localStorage on mount
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth) {
          const parsed: AuthResponse = JSON.parse(storedAuth);

          // Check if token is expired
          const currentTime = Math.floor(Date.now() / 1000);
          if (parsed.expires_at && parsed.expires_at > currentTime) {
            setAuthData(parsed);
          } else {
            // Token expired, clear it
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Failed to load auth data:", error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = (authResponse: AuthResponse) => {
    setAuthData(authResponse);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authResponse));
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAuthenticated = authData !== null;

  return (
    <AuthContext.Provider
      value={{
        authData,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
