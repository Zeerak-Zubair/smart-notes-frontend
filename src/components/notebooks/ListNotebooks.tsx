import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  NotebooksApiService,
  type Notebook,
} from "../../services/api/notebooks.api";
import {
  Box,
  Card,
  Flex,
  Text,
  Button,
  Heading,
  Grid,
  IconButton,
  Badge,
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
              <Card
                key={notebook.id}
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  borderLeft: `4px solid ${notebook.color || "var(--accent-9)"}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
                onClick={() => navigate(`/notebooks/view/${notebook.id}`)}
              >
                <Flex direction="column" gap="3" p="1">
                  {/* Card Header */}
                  <Flex justify="between" align="start">
                    <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
                      <Heading
                        size="4"
                        weight="bold"
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {notebook.title}
                      </Heading>
                      {notebook.color && (
                        <Badge
                          color="gray"
                          variant="soft"
                          size="1"
                          style={{
                            width: "fit-content",
                            background: notebook.color + "20",
                            color: notebook.color,
                          }}
                        >
                          {notebook.color}
                        </Badge>
                      )}
                    </Flex>
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/notebooks/edit/${notebook.id}`);
                      }}
                    >
                      ✏️
                    </IconButton>
                  </Flex>

                  {/* Description */}
                  <Text
                    size="2"
                    color="gray"
                    style={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      minHeight: "2.5em",
                    }}
                  >
                    {notebook.description || "No description"}
                  </Text>

                  {/* Footer */}
                  <Flex justify="between" align="center" pt="2" style={{ borderTop: "1px solid var(--gray-5)" }}>
                    <Text size="1" color="gray">
                      Order: {notebook.order_index}
                    </Text>
                    <Text size="1" color="gray">
                      Updated {new Date(notebook.updated_at).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Grid>
        )}
      </Flex>
    </Box>
  );
};

export default ListNotebooks;
