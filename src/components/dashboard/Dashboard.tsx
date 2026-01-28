import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  NotebooksApiService,
  type Notebook,
} from "../../services/api/notebooks.api";
import {
  NotesApiService,
  type Note,
} from "../../services/api/notes.api";
import Sidebar from "../common/Sidebar";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  ScrollArea,
  IconButton,
  Card,
  Badge,
} from "@radix-ui/themes";

const Dashboard = () => {
  const navigate = useNavigate();

  // User ID - hardcoded for now, will be replaced with auth context
  const [user_id] = useState<string>("27d8539a-e705-4da2-a468-3f08d6ab23c5");

  // Selection state
  const [selectedNotebookId, setSelectedNotebookId] = useState<string | null>(null);

  // Data state
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Loading state
  const [isLoadingNotebooks, setIsLoadingNotebooks] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);

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

  // Fetch notes when a notebook is selected
  async function fetchNotes(notebookId: string) {
    setIsLoadingNotes(true);
    try {
      const response = await NotesApiService.getNotes(notebookId);
      setNotes(response.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoadingNotes(false);
    }
  }

  // Fetch notebooks on mount
  useEffect(() => {
    fetchNotebooks();
  }, [user_id]);

  // Fetch notes when notebook selection changes
  useEffect(() => {
    if (selectedNotebookId !== null) {
      fetchNotes(selectedNotebookId);
    } else {
      setNotes([]);
    }
  }, [selectedNotebookId]);

  // Handler for notebook selection
  const handleNotebookClick = (notebookId: string) => {
    setSelectedNotebookId(notebookId);
  };

  // Handler for note click - navigate to full page
  const handleNoteClick = (noteId: string) => {
    navigate(`/notes/view/${noteId}`);
  };

  // Extract title from HTML content for notes
  const extractTitle = (content: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.trim().substring(0, 50) || "Untitled Note";
  };

  // Extract preview from HTML content
  const extractPreview = (content: string): string => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.trim().substring(0, 150) || "No content";
  };

  return (
    <Flex style={{ height: "100vh", overflow: "hidden" }}>
      {/* GLOBAL SIDEBAR */}
      <Sidebar />
      
      {/* DASHBOARD CONTENT */}
      <Flex style={{ flex: 1, overflow: "hidden" }}>
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
                  <Card
                    key={notebook.id}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                      borderLeft: `4px solid ${notebook.color || "var(--accent-9)"}`,
                      background:
                        selectedNotebookId === notebook.id
                          ? "var(--accent-2)"
                          : "var(--color-background)",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedNotebookId !== notebook.id) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "var(--shadow-3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedNotebookId !== notebook.id) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "";
                      }
                    }}
                    onClick={() => handleNotebookClick(notebook.id)}
                  >
                    <Flex direction="column" gap="2" p="1">
                      {/* Header */}
                      <Flex justify="between" align="start">
                        <Flex direction="column" gap="1" style={{ flex: 1, minWidth: 0 }}>
                          <Heading
                            size="3"
                            weight="bold"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {notebook.title}
                          </Heading>
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
                        }}
                      >
                        {notebook.description || "No description"}
                      </Text>

                      {/* Footer */}
                      <Flex justify="between" align="center" pt="1">
                        <Text size="1" color="gray">
                          Updated {new Date(notebook.updated_at).toLocaleDateString()}
                        </Text>
                      </Flex>
                    </Flex>
                  </Card>
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
        }}
      >
        {/* Header */}
        <Box p="4" style={{ borderBottom: "1px solid var(--gray-6)" }}>
          <Flex direction="column" gap="3">
            <Heading size="5">Notes</Heading>
            {selectedNotebookId && (
              <Button
                size="2"
                onClick={() => navigate("/notes/add")}
                style={{ width: "100%" }}
              >
                + New Note
              </Button>
            )}
          </Flex>
        </Box>

        {/* Content */}
        <ScrollArea style={{ flex: 1 }}>
          <Box p="3">
            {/* No notebook selected */}
            {!selectedNotebookId && (
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap="3"
                style={{ padding: "3rem 1rem" }}
              >
                <Text size="6" weight="bold">
                  📝
                </Text>
                <Text size="3" color="gray" align="center">
                  Select a notebook to view notes
                </Text>
              </Flex>
            )}

            {/* Loading */}
            {selectedNotebookId && isLoadingNotes && (
              <Flex justify="center" align="center" style={{ padding: "3rem 1rem" }}>
                <Text size="2" color="gray">
                  Loading notes...
                </Text>
              </Flex>
            )}

            {/* Empty state */}
            {selectedNotebookId && !isLoadingNotes && notes.length === 0 && (
              <Card size="2">
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  gap="3"
                  style={{ padding: "2rem" }}
                >
                  <Text size="5" weight="bold">
                    📝
                  </Text>
                  <Flex direction="column" align="center" gap="2">
                    <Heading size="4">No Notes Yet</Heading>
                    <Text size="2" color="gray" align="center">
                      Create your first note in this notebook
                    </Text>
                  </Flex>
                  <Button
                    size="2"
                    onClick={() => navigate("/notes/add")}
                  >
                    Create Note
                  </Button>
                </Flex>
              </Card>
            )}

            {/* Notes list */}
            {selectedNotebookId && !isLoadingNotes && notes.length > 0 && (
              <Flex direction="column" gap="3">
                {notes.map((note) => (
                  <Card
                    key={note.id}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "var(--shadow-3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "";
                    }}
                    onClick={() => handleNoteClick(note.id)}
                  >
                    <Flex direction="column" gap="2" p="1">
                      {/* Header */}
                      <Flex justify="between" align="start">
                        <Heading
                          size="3"
                          weight="bold"
                          style={{
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {note.title || extractTitle(note.content)}
                        </Heading>
                        <Flex gap="1">
                          <IconButton
                            size="1"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/notes/edit/${note.id}`);
                            }}
                          >
                            ✏️
                          </IconButton>
                        </Flex>
                      </Flex>

                      {/* Content Preview */}
                      <Text
                        size="2"
                        color="gray"
                        style={{
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {extractPreview(note.content)}
                      </Text>

                      {/* Footer */}
                      <Flex justify="between" align="center" pt="1">
                        <Text size="1" color="gray">
                          Updated {new Date(note.updated_at).toLocaleDateString()}
                        </Text>
                        <Badge size="1" variant="soft">
                          #{note.order_index}
                        </Badge>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            )}
          </Box>
        </ScrollArea>

        {/* Footer */}
        {selectedNotebookId && (
          <Box p="3" style={{ borderTop: "1px solid var(--gray-6)" }}>
            <Text size="1" color="gray" align="center">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </Text>
          </Box>
        )}
      </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
