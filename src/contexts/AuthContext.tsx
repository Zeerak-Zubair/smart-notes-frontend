import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { TokenStore } from "../services/auth/tokenStore";

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


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth data from localStorage on mount
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const storedRefreshToken = localStorage.getItem('refresh_token');
        if (storedRefreshToken) {
            // We have a refresh token. Ideally we should call an endpoint to get a new access token here.
             // For now, we just acknowledge we might be logged in, but we don't have an access token yet.
             // Or if the requirement implies we should have persisted the user session... 
             // "keep the access token in memory using state"
             // If we reload, memory is cleared. So we must use refresh token to get new access token.
             // Since I don't have a refresh API endpoint in the spec provided earlier, 
             // I will just implement the storage part as requested:
             // "provide a mechanism to store a refresh token in localStorage"
             
             // I will assume for this step we strictly follow: 
             // 1. refresh token -> localStorage
             // 2. access token -> state (and TokenStore for API usage)
        }
      } catch (error) {
        console.error("Failed to load auth data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = (authResponse: AuthResponse) => {
    setAuthData(authResponse);
    TokenStore.setAccessToken(authResponse.access_token);
    localStorage.setItem('refresh_token', authResponse.refresh_token);
  };

  const logout = () => {
    setAuthData(null);
    TokenStore.setAccessToken(null);
    localStorage.removeItem('refresh_token');
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
