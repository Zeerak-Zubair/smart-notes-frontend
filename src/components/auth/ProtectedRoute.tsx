import { Navigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Flex, Text } from "@radix-ui/themes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Text size="4" color="gray">
          Loading...
        </Text>
      </Flex>
    );
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Render the protected component
  return <>{children}</>;
};

export default ProtectedRoute;
