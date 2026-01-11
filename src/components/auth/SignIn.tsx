import React, { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { AuthApiService } from "../../services/api/auth.api";
import {
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Heading,
  Callout,
} from "@radix-ui/themes";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      //call the api
      const user = await AuthApiService.signin({ email, password });

      console.log("Sign In Successfull!", user);
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
            Sign In
          </Heading>

          {error && (
            <Callout.Root color="red" role="alert">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
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

              <Button
                type="submit"
                size="3"
                disabled={isLoading}
                style={{ marginTop: "0.5rem" }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <Text align="center" size="2" color="gray">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ color: "var(--accent-11)", fontWeight: 500 }}
                >
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default SignIn;
