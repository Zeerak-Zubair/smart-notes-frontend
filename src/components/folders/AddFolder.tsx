import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { FoldersApiService } from "../../services/api/folders.api";
import {
  Card,
  Flex,
  Text,
  TextField,
  Button,
  Heading,
  Callout,
} from "@radix-ui/themes";

const AddFolder = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const user_id: string = "27d8539a-e705-4da2-a468-3f08d6ab23c5";
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const folder = await FoldersApiService.createFolder(user_id, title);
      console.log("Create Folder API response:", folder);
      setSuccess(true);
      setTitle("");

      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/folders");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred during creating folder");
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
      <Card size="4" style={{ maxWidth: "500px", width: "100%" }}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2">
            <Heading size="6" weight="bold">
              Create New Folder
            </Heading>
            <Text size="2" color="gray">
              Add a new folder to organize your notes
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
                Folder created successfully! Redirecting...
              </Callout.Text>
            </Callout.Root>
          )}

          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="2">
                <Text as="label" htmlFor="title" size="2" weight="medium">
                  Folder Title
                </Text>
                <TextField.Root
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter folder title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  size="3"
                  autoFocus
                />
              </Flex>

              <Flex gap="3" mt="2">
                <Button
                  type="submit"
                  size="3"
                  disabled={isLoading || !title.trim()}
                  style={{ flex: 1 }}
                >
                  {isLoading ? "Creating..." : "Create Folder"}
                </Button>
                <Button
                  type="button"
                  size="3"
                  variant="soft"
                  color="gray"
                  onClick={() => navigate("/folders")}
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

export default AddFolder;
