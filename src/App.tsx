import "./App.css";
import {
  Flex,
  Text,
  Button,
  Box,
  Container,
  Card,
  Heading,
  Badge,
} from "@radix-ui/themes";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();

  return (
    <Box style={{ minHeight: "100vh", background: "var(--gray-2)" }}>
      {/* Header */}
      <Box
        style={{
          padding: "1rem 2rem",
          borderBottom: "1px solid var(--gray-6)",
          backgroundColor: "var(--color-background)",
        }}
      >
        <Container size="4">
          <Flex justify="between" align="center">
            <Flex align="center" gap="2">
              <Box
                style={{
                  width: "32px",
                  height: "32px",
                  background: "var(--accent-9)",
                  borderRadius: "var(--radius-2)",
                }}
              />
              <Heading size="5">SmartNotes</Heading>
            </Flex>
            <Flex
              gap="4"
              align="center"
              display={{ initial: "none", md: "flex" }}
            >
              <Button variant="ghost" onClick={() => navigate("/signin")}>
                Sign in
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Hero Section */}
      <Container size="4">
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{
            minHeight: "calc(100vh - 100px)",
            position: "relative",
            padding: "4rem 1rem",
          }}
        >
          {/* Decorative Sticky Note */}
          <Card
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              background: "#fef08a",
              padding: "1.5rem",
              boxShadow: "var(--shadow-4)",
              transform: "rotate(-3deg)",
              maxWidth: "180px",
              border: "none",
            }}
          >
            <Text
              size="2"
              style={{
                lineHeight: "1.6",
                fontStyle: "italic",
                color: "#422006",
              }}
            >
              Take notes to keep track of crucial details, and accomplish more
              tasks with ease.
            </Text>
            <Box
              style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: "20px",
                height: "20px",
                background: "#ef4444",
                borderRadius: "50% 50% 50% 0",
              }}
            />
          </Card>

          {/* Reminders Card */}
          <Card
            style={{
              position: "absolute",
              top: "15%",
              right: "8%",
              padding: "1.5rem",
              boxShadow: "var(--shadow-3)",
            }}
          >
            <Heading size="3" mb="3">
              Reminders
            </Heading>
            <Flex direction="column" align="center" gap="2">
              <Box
                style={{
                  width: "60px",
                  height: "60px",
                  border: "4px solid var(--gray-6)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text size="6">⏰</Text>
              </Box>
              <Text size="2" color="gray">
                Today's Meeting
              </Text>
              <Badge color="blue">13:00 - 13:30</Badge>
            </Flex>
          </Card>

          {/* Today's Tasks Card */}
          <Card
            style={{
              position: "absolute",
              bottom: "20%",
              left: "8%",
              padding: "1.5rem",
              boxShadow: "var(--shadow-3)",
              minWidth: "220px",
            }}
          >
            <Heading size="3" mb="3">
              Today's tasks
            </Heading>
            <Flex direction="column" gap="3">
              <Box>
                <Flex align="center" gap="2" mb="1">
                  <Badge
                    color="red"
                    variant="solid"
                    style={{ width: "8px", height: "8px", padding: 0 }}
                  />
                  <Text size="2">New ideas for campaign</Text>
                </Flex>
                <Box
                  style={{
                    height: "4px",
                    background: "var(--blue-9)",
                    borderRadius: "var(--radius-full)",
                    width: "60%",
                  }}
                />
              </Box>
              <Box>
                <Flex align="center" gap="2" mb="1">
                  <Badge
                    color="green"
                    variant="solid"
                    style={{ width: "8px", height: "8px", padding: 0 }}
                  />
                  <Text size="2">Design PPT #4</Text>
                </Flex>
                <Box
                  style={{
                    height: "4px",
                    background: "var(--orange-9)",
                    borderRadius: "var(--radius-full)",
                    width: "90%",
                  }}
                />
              </Box>
            </Flex>
          </Card>

          {/* Integrations Card */}
          <Card
            style={{
              position: "absolute",
              bottom: "15%",
              right: "10%",
              padding: "1.5rem",
              boxShadow: "var(--shadow-3)",
            }}
          >
            <Heading size="3" mb="3">
              100+ Integrations
            </Heading>
            <Flex gap="2">
              <Card style={{ padding: "0.75rem" }}>
                <Text size="5">📧</Text>
              </Card>
              <Card style={{ padding: "0.75rem" }}>
                <Text size="5">💬</Text>
              </Card>
              <Card style={{ padding: "0.75rem" }}>
                <Text size="5">📅</Text>
              </Card>
            </Flex>
          </Card>

          {/* Main Content */}
          <Flex
            direction="column"
            align="center"
            gap="4"
            style={{ zIndex: 10, maxWidth: "800px", textAlign: "center" }}
          >
            <Card
              style={{
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "var(--shadow-3)",
              }}
            >
              <Flex gap="1" style={{ flexWrap: "wrap", width: "40px" }}>
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "var(--blue-9)",
                    borderRadius: "var(--radius-1)",
                  }}
                />
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "var(--gray-12)",
                    borderRadius: "var(--radius-1)",
                  }}
                />
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "var(--gray-12)",
                    borderRadius: "var(--radius-1)",
                  }}
                />
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "var(--gray-12)",
                    borderRadius: "var(--radius-1)",
                  }}
                />
              </Flex>
            </Card>

            <Box>
              <Heading
                size="9"
                style={{
                  marginBottom: "0.25rem",
                  lineHeight: "1.2",
                }}
              >
                Think, plan, and track
              </Heading>
              <Heading
                size="9"
                color="gray"
                style={{
                  marginBottom: "1rem",
                  lineHeight: "1.2",
                }}
              >
                all in one place
              </Heading>
            </Box>

            <Text size="4" color="gray" style={{ marginBottom: "1rem" }}>
              Efficiently manage your tasks and boost productivity.
            </Text>

            <Button size="4" onClick={() => navigate("/signup")}>
              Get free demo
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default App;
