import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FoldersApiService,
  type Folder,
} from "../../services/api/folders.api";
import {
  NotebooksApiService,
  type Notebook,
} from "../../services/api/notebooks.api";
import {
  NotesApiService,
  type Note,
} from "../../services/api/notes.api";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  ScrollArea,
  Separator,
  IconButton,
  Card,
  Badge,
} from "@radix-ui/themes";

const Dashboard = () => {
  const navigate = useNavigate();

  // User ID - hardcoded for now, will be replaced with auth context
  const [user_id] = useState<string>("27d8539a-e705-4da2-a468-3f08d6ab23c5");

  // Selection state
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [selectedNotebookId, setSelectedNotebookId] = useState<number | null>(null);

  // Data state
  const [folders, setFolders] = useState<Folder[]>([]);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  // Loading state
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);
  const [isLoadingNotebooks, setIsLoadingNotebooks] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);

  // Fetch folders on component mount
  async function fetchFolders() {
    setIsLoadingFolders(true);
    try {
      const response = await FoldersApiService.getFolders(user_id);
      setFolders(response.folders);
    } catch (error) {
      console.error("Error fetching folders:", error);
    } finally {
      setIsLoadingFolders(false);
    }
  }

  // Fetch notebooks when a folder is selected
  async function fetchNotebooks(folderId: number) {
    setIsLoadingNotebooks(true);
    try {
      const response = await NotebooksApiService.getNotebooks(String(folderId));
      setNotebooks(response.notebooks);
    } catch (error) {
      console.error("Error fetching notebooks:", error);
    } finally {
      setIsLoadingNotebooks(false);
    }
  }

  // Fetch notes when a notebook is selected
  async function fetchNotes(notebookId: number) {
    setIsLoadingNotes(true);
    try {
      const response = await NotesApiService.getNotes(String(notebookId));
      setNotes(response.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setIsLoadingNotes(false);
    }
  }

  // Fetch folders on mount
  useEffect(() => {
    fetchFolders();
  }, [user_id]);

  // Fetch notebooks when folder selection changes
  useEffect(() => {
    if (selectedFolderId !== null) {
      fetchNotebooks(selectedFolderId);
      setSelectedNotebookId(null); // Reset notebook selection
      setNotes([]); // Clear notes
    } else {
      setNotebooks([]);
      setNotes([]);
    }
  }, [selectedFolderId]);

  // Fetch notes when notebook selection changes
  useEffect(() => {
    if (selectedNotebookId !== null) {
      fetchNotes(selectedNotebookId);
    } else {
      setNotes([]);
    }
  }, [selectedNotebookId]);

  // Handler for folder selection
  const handleFolderClick = (folderId: number) => {
    setSelectedFolderId(folderId);
  };

  // Handler for notebook selection
  const handleNotebookClick = (notebookId: number) => {
    setSelectedNotebookId(notebookId);
  };

  // Handler for note click - navigate to full page
  const handleNoteClick = (noteId: number) => {
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
      {/* LEFT PANEL - Folders Sidebar */}
      <Box
        style={{
          width: "280px",
          height: "100vh",
          background: "var(--gray-2)",
          borderRight: "1px solid var(--gray-6)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sidebar Header */}
        <Box p="4">
          <Flex direction="column" gap="3">
            <Heading size="5" weight="bold">
              My Folders
            </Heading>
            <Button
              size="2"
              onClick={() => navigate("/folders/add")}
              style={{ width: "100%" }}
            >
              + New Folder
            </Button>
          </Flex>
        </Box>

        <Separator size="4" />

        {/* Folders List */}
        <ScrollArea style={{ flex: 1 }}>
          <Box p="2">
            {isLoadingFolders && (
              <Box p="4">
                <Text size="2" color="gray" align="center">
                  Loading folders...
                </Text>
              </Box>
            )}

            {!isLoadingFolders && folders.length === 0 && (
              <Box p="4">
                <Text size="2" color="gray" align="center">
                  No folders yet. Create your first folder to get started!
                </Text>
              </Box>
            )}

            {!isLoadingFolders && folders.length > 0 && (
              <Flex direction="column" gap="1">
                {folders.map((folder) => (
                  <Flex
                    key={folder.id}
                    align="center"
                    gap="2"
                    p="3"
                    style={{
                      borderRadius: "var(--radius-2)",
                      cursor: "pointer",
                      background:
                        selectedFolderId === folder.id
                          ? "var(--accent-3)"
                          : "transparent",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFolderId !== folder.id) {
                        e.currentTarget.style.background = "var(--gray-3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFolderId !== folder.id) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <Flex
                      align="center"
                      gap="2"
                      style={{ flex: 1 }}
                      onClick={() => handleFolderClick(folder.id)}
                    >
                      <Text size="3" weight="medium">
                        📁
                      </Text>
                      <Text
                        size="2"
                        weight={selectedFolderId === folder.id ? "bold" : "medium"}
                        style={{
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {folder.title}
                      </Text>
                    </Flex>
                    <IconButton
                      size="1"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/folders/edit/${folder.id}`);
                      }}
                      style={{ flexShrink: 0 }}
                    >
                      ✏️
                    </IconButton>
                  </Flex>
                ))}
              </Flex>
            )}
          </Box>
        </ScrollArea>

        {/* Sidebar Footer */}
        <Box p="3" style={{ borderTop: "1px solid var(--gray-6)" }}>
          <Text size="1" color="gray" align="center">
            {folders.length} {folders.length === 1 ? "folder" : "folders"}
          </Text>
        </Box>
      </Box>

      {/* MIDDLE PANEL - Notebooks */}
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
            {selectedFolderId && (
              <Button
                size="2"
                onClick={() => navigate("/notebooks/add")}
                style={{ width: "100%" }}
              >
                + New Notebook
              </Button>
            )}
          </Flex>
        </Box>

        {/* Content */}
        <ScrollArea style={{ flex: 1 }}>
          <Box p="3">
            {/* No folder selected */}
            {!selectedFolderId && (
              <Flex
                direction="column"
                align="center"
                justify="center"
                gap="3"
                style={{ padding: "3rem 1rem" }}
              >
                <Text size="6" weight="bold">
                  📂
                </Text>
                <Text size="3" color="gray" align="center">
                  Select a folder to view notebooks
                </Text>
              </Flex>
            )}

            {/* Loading */}
            {selectedFolderId && isLoadingNotebooks && (
              <Flex justify="center" align="center" style={{ padding: "3rem 1rem" }}>
                <Text size="2" color="gray">
                  Loading notebooks...
                </Text>
              </Flex>
            )}

            {/* Empty state */}
            {selectedFolderId && !isLoadingNotebooks && notebooks.length === 0 && (
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
                      Create your first notebook in this folder
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
            {selectedFolderId && !isLoadingNotebooks && notebooks.length > 0 && (
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
        {selectedFolderId && (
          <Box p="3" style={{ borderTop: "1px solid var(--gray-6)" }}>
            <Text size="1" color="gray" align="center">
              {notebooks.length} {notebooks.length === 1 ? "notebook" : "notebooks"}
            </Text>
          </Box>
        )}
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
  );
};

export default Dashboard;
