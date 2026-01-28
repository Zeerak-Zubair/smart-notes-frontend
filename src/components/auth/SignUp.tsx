import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { AuthApiService } from "../../services/api/auth.api";
import { useAuth } from "../../contexts/AuthContext";
import {
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Heading,
  Callout,
  Box,
} from "@radix-ui/themes";

const SignUp = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const authResponse = await AuthApiService.signup({
        name,
        email,
        password,
        image: image || undefined,
      });

      login(authResponse);
      navigate("/dashboard");

      setName("");
      setEmail("");
      setPassword("");
      setImage(null);
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: "1rem",
        background: "var(--accent-2)",
      }}
    >
      <Card size="4" style={{ maxWidth: "450px", width: "100%" }}>
        <Flex direction="column" gap="4">
          <Heading size="8" align="center" mb="2">
            Sign Up
          </Heading>

          {error && (
            <Callout.Root color="red" role="alert">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="name" size="2" weight="medium">
                  Name
                </Text>
                <TextField.Root
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  size="3"
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="email" size="2" weight="medium">
                  Email
                </Text>
                <TextField.Root
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  size="3"
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="password" size="2" weight="medium">
                  Password
                </Text>
                <TextField.Root
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  size="3"
                />
              </Flex>

              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="image" size="2" weight="medium">
                  Profile Image (Optional)
                </Text>
                <Box>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    style={{
                      width: "100%",
                      padding: "0.5rem",
                      border: "1px solid var(--gray-7)",
                      borderRadius: "var(--radius-2)",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                    }}
                  />
                  {image && (
                    <Text size="1" color="gray" mt="1">
                      Selected: {image.name}
                    </Text>
                  )}
                </Box>
              </Flex>

              <Button
                type="submit"
                size="3"
                disabled={isLoading}
                style={{ marginTop: "0.5rem" }}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>

              <Text align="center" size="2" color="gray">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  style={{ color: "var(--accent-11)", fontWeight: 500 }}
                >
                  Sign In
                </Link>
              </Text>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default SignUp;
