import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  NotebooksApiService,
  type Notebook,
} from "../../services/api/notebooks.api";


import NotebookCard from "../notebooks/NotebookCard";
import ListNotes from "../notes/ListNotes";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  ScrollArea,
  Card,
} from "@radix-ui/themes";

const Dashboard = () => {
  const navigate = useNavigate();

  // User ID - hardcoded for now, will be replaced with auth context
  const [user_id] = useState<string>("27d8539a-e705-4da2-a468-3f08d6ab23c5");

  // Selection state
  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(null);

  // Data state
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);


  // Loading state
  const [isLoadingNotebooks, setIsLoadingNotebooks] = useState(false);


  // Fetch notebooks on component mount
  async function fetchNotebooks() {
    setIsLoadingNotebooks(true);
    try {
      const response = await NotebooksApiService.getNotebooks();
      setNotebooks(response.notebooks);
    } catch (error) {
      console.error("Error fetching notebooks:", error);
    } finally {
      setIsLoadingNotebooks(false);
    }
  }



  // Fetch notebooks on mount
  useEffect(() => {
    fetchNotebooks();
  }, [user_id]);



  // Select first notebook on load
  useEffect(() => {
    if (notebooks.length > 0 && selectedNotebookId === null) {
      setSelectedNotebookId(notebooks[0].id);
    }
  }, [notebooks]);

  // Handler for notebook selection
  const handleNotebookClick = (notebookId: string) => {
    setSelectedNotebookId(notebookId);
  };

  return (
      /* DASHBOARD CONTENT */
      <Flex style={{ height: "100%", overflow: "hidden" }}>
          {/* LEFT PANEL - Notebooks */}
      <Box
        style={{
          width: "400px",
          height: "100vh",
          background: "var(--gray-1)",
          borderRight: "1px solid var(--gray-6)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Box p="4" style={{ borderBottom: "1px solid var(--gray-6)" }}>
          <Flex direction="column" gap="3">
            <Heading size="5">Notebooks</Heading>
              <Button
                size="2"
                onClick={() => navigate("/notebooks/add")}
                style={{ width: "100%" }}
              >
                + New Notebook
              </Button>
          </Flex>
        </Box>

        {/* Content */}
        <ScrollArea style={{ flex: 1 }}>
          <Box p="3">
            {/* Loading */}
            {isLoadingNotebooks && (
              <Flex justify="center" align="center" style={{ padding: "3rem 1rem" }}>
                <Text size="2" color="gray">
                  Loading notebooks...
                </Text>
              </Flex>
            )}

            {/* Empty state */}
            {!isLoadingNotebooks && notebooks.length === 0 && (
              <Card size="2">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap="3"
                  style={{ padding: "2rem" }}
                >
                  <Text size="5" weight="bold">
                    📓
                  </Text>
                  <Flex direction="column" align="center" gap="2">
                    <Heading size="4">No Notebooks Yet</Heading>
                    <Text size="2" color="gray" align="center">
                      Create your first notebook to get started!
                    </Text>
                  </Flex>
                  <Button
                    size="2"
                    onClick={() => navigate("/notebooks/add")}
                  >
                    Create Notebook
                  </Button>
                </Flex>
              </Card>
            )}

            {/* Notebooks list */}
            {!isLoadingNotebooks && notebooks.length > 0 && (
              <Flex direction="column" gap="3">
                {notebooks.map((notebook) => (
                  <NotebookCard
                    key={notebook.id}
                    notebook={notebook}
                    selected={selectedNotebookId === notebook.id}
                    onClick={() => handleNotebookClick(notebook.id)}
                  />
                ))}
              </Flex>
            )}
          </Box>
        </ScrollArea>

        {/* Footer */}
        <Box p="3" style={{ borderTop: "1px solid var(--gray-6)" }}>
          <Text size="1" color="gray" align="center">
            {notebooks.length} {notebooks.length === 1 ? "notebook" : "notebooks"}
          </Text>
        </Box>
      </Box>

      {/* RIGHT PANEL - Notes */}
      <Box
        style={{
          flex: 1,
          height: "100vh",
          background: "var(--gray-1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >
        {selectedNotebookId ? (
           <ListNotes notebookId={selectedNotebookId} />
        ) : (
            <Flex
                direction="column"
                align="center"
                justify="center"
                gap="3"
                style={{ height: "100%" }}
              >
                <Text size="6" weight="bold">
                  📝
                </Text>
                <Text size="3" color="gray" align="center">
                  Select a notebook to view notes
                </Text>
              </Flex>
        )}
      </Box>
      </Flex>
  );
};

export default Dashboard;
