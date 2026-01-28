import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { NotebooksApiService } from "../../services/api/notebooks.api";
import {
  Card,
  Flex,
  Text,
  TextField,
  TextArea,
  Button,
  Heading,
  Callout,
  Box,
  Grid,
} from "@radix-ui/themes";

const AddNotebook = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#6366f1");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  // Predefined color palette
  const colorPalette = [
    { name: "Indigo", value: "#6366f1" },
    { name: "Purple", value: "#9333ea" },
    { name: "Pink", value: "#ec4899" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Amber", value: "#f59e0b" },
    { name: "Green", value: "#10b981" },
    { name: "Teal", value: "#14b8a6" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Cyan", value: "#06b6d4" },
    { name: "Lime", value: "#84cc16" },
    { name: "Gray", value: "#6b7280" },
  ];

    async function fetchNotebooksCount() {
    try {
      const response = await NotebooksApiService.getNotebooks();
      setCount(response.count || 0);
    } catch (error) {
      console.error("Error fetching notebooks count:", error);
    }
  }

  useEffect(() => {
    fetchNotebooksCount();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await NotebooksApiService.createNotebook(
        title,
        description,
        color,
        count + 1
      );
      console.log("Create Notebook API Response:", response);
      setSuccess(true);

      // Clear form
      setTitle("");
      setDescription("");
      setColor("#6366f1");

      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/notebooks");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred during creating notebook");
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
        background: "var(--gray-2)",
      }}
    >
      <Card size="4" style={{ maxWidth: "600px", width: "100%" }}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Heading size="6" weight="bold">
              Create New Notebook
            </Heading>
            <Text size="2" color="gray">
              Add a new notebook to organize your notes
            </Text>
          </Flex>

          {error && (
            <Callout.Root color="red" role="alert">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          {success && (
            <Callout.Root color="green">
              <Callout.Text>
                Notebook created successfully! Redirecting...
              </Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              {/* Title Field */}
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="title" size="2" weight="medium">
                  Notebook Title
                </Text>
                <TextField.Root
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter notebook title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  size="3"
                  autoFocus
                />
              </Flex>

              {/* Description Field */}
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="description" size="2" weight="medium">
                  Description
                </Text>
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Enter notebook description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  size="3"
                />
              </Flex>

              {/* Color Picker */}
              <Flex direction="column" gap="2">
                <Text as="label" size="2" weight="medium">
                  Color
                </Text>
                <Grid columns="6" gap="2">
                  {colorPalette.map((colorOption) => (
                    <Box
                      key={colorOption.value}
                      onClick={() => setColor(colorOption.value)}
                      style={{
                        width: "100%",
                        height: "48px",
                        background: colorOption.value,
                        borderRadius: "var(--radius-2)",
                        cursor: "pointer",
                        border:
                          color === colorOption.value
                            ? "3px solid var(--gray-12)"
                            : "2px solid transparent",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title={colorOption.name}
                    >
                      {color === colorOption.value && (
                        <Text
                          size="3"
                          style={{
                            color: "white",
                            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                          }}
                        >
                          ✓
                        </Text>
                      )}
                    </Box>
                  ))}
                </Grid>
                <Flex align="center" gap="2" mt="1">
                  <Box
                    style={{
                      width: "24px",
                      height: "24px",
                      background: color,
                      borderRadius: "var(--radius-1)",
                      border: "1px solid var(--gray-6)",
                    }}
                  />
                  <Text size="2" color="gray">
                    Selected: {colorPalette.find(c => c.value === color)?.name || "Custom"}
                  </Text>
                </Flex>
              </Flex>

              {/* Action Buttons */}
              <Flex gap="3" mt="2">
                <Button
                  type="submit"
                  size="3"
                  disabled={isLoading || !title.trim()}
                  style={{ flex: 1 }}
                >
                  {isLoading ? "Creating..." : "Create Notebook"}
                </Button>
                <Button
                  type="button"
                  size="3"
                  variant="soft"
                  color="gray"
                  onClick={() => navigate("/notebooks")}
                  disabled={isLoading}
                  style={{ flex: 1 }}
                >
                  Cancel
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Card>
    </Flex>
  );
};

export default AddNotebook;
