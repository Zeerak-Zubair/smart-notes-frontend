import { useState, type FormEvent } from "react";
import { useParams, useNavigate } from "react-router";
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

const EditFolder = () => {
  const [title, setTitle] = useState("");
  const { id } = useParams(); //folderId
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      const folder = await FoldersApiService.updateFolders(id!, title);
      console.log("Update Folder API response:", folder);
      setSuccess(true);

      // Navigate back after a short delay
      setTimeout(() => {
        navigate("/folders");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "An error occurred during updating folder");
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
              Edit Folder
            </Heading>
            <Text size="2" color="gray">
              Update the folder title below
            </Text>
          </Flex>

          {error && (
            <Callout.Root color="red" role="alert">
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          )}

          {success && (
            <Callout.Root color="green">
              <Callout.Text>Folder updated successfully! Redirecting...</Callout.Text>
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
                  id="title"
                  name="title"
                  placeholder="Enter folder title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  size="3"
                />
              </Flex>

              <Flex gap="3" mt="2">
                <Button
                  type="submit"
                  size="3"
                  disabled={isLoading || !title.trim()}
                  style={{ flex: 1 }}
                >
                  {isLoading ? "Updating..." : "Update Folder"}
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

export default EditFolder;
