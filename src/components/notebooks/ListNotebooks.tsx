import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  NotebooksApiService,
  type Notebook,
} from "../../services/api/notebooks.api";
import NotebookCard from "./NotebookCard";
import {
  Box,
  Card,
  Flex,
  Text,
  Button,
  Heading,
  Grid,


} from "@radix-ui/themes";

const ListNotebooks = () => {
  const navigate = useNavigate();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // User ID - hardcoded for now, will be replaced with auth context
  const [user_id] = useState<string>("27d8539a-e705-4da2-a468-3f08d6ab23c5");

  async function fetchNotebooks() {
    setIsLoading(true);
    try {
      const response = await NotebooksApiService.getNotebooks();
      console.log(response);
      setNotebooks(response.notebooks);
    } catch (error) {
      console.error("Error fetching notebooks:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotebooks();
  }, [user_id]);

  return (
    <Box
      style={{
        minHeight: "100vh",
        background: "var(--gray-1)",
        padding: "2rem",
      }}
    >
      <Flex direction="column" gap="5" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <Flex justify="between" align="center">
          <Flex direction="column" gap="2">
            <Heading size="8">Notebooks</Heading>
            <Text size="3" color="gray">
              {notebooks.length} {notebooks.length === 1 ? "notebook" : "notebooks"}
            </Text>
          </Flex>
          <Button
            size="3"
            onClick={() => navigate("/notebooks/add")}
          >
            + New Notebook
          </Button>
        </Flex>

        {/* Loading State */}
        {isLoading && (
          <Flex justify="center" align="center" style={{ minHeight: "300px" }}>
            <Text size="3" color="gray">
              Loading notebooks...
            </Text>
          </Flex>
        )}

        {/* Empty State */}
        {!isLoading && notebooks.length === 0 && (
          <Card size="3">
            <Flex
              direction="column"
              align="center"
              justify="center"
              gap="4"
              style={{ padding: "3rem" }}
            >
              <Text size="6" weight="bold">
                📓
              </Text>
              <Flex direction="column" align="center" gap="2">
                <Heading size="5">No Notebooks Yet</Heading>
                <Text size="2" color="gray" align="center">
                  Create your first notebook to start organizing your notes
                </Text>
              </Flex>
              <Button
                size="3"
                onClick={() => navigate("/notebooks/add")}
              >
                Create Notebook
              </Button>
            </Flex>
          </Card>
        )}

        {/* Notebooks Grid */}
        {!isLoading && notebooks.length > 0 && (
          <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="4">
            {notebooks.map((notebook) => (
              <NotebookCard key={notebook.id} notebook={notebook} />
            ))}
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default ListNotebooks;
