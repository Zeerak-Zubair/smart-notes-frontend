import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FoldersApiService,
  type Folder,
} from "../../services/api/folders.api";
import {
  Box,
  Flex,
  Text,
  Button,
  Heading,
  ScrollArea,
  Separator,
  IconButton,
} from "@radix-ui/themes";

const ListFolders = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const user_id: string = "27d8539a-e705-4da2-a468-3f08d6ab23c5";

  async function fetchFolders() {
    const response = await FoldersApiService.getFolders(user_id);
    console.log(typeof response.folders);
    console.log(folders);
    setFolders(response.folders);
  }

  useEffect(() => {
    fetchFolders();
  }, [user_id]);

  const handleFolderClick = (folderId: number) => {
    setSelectedFolderId(folderId);
    navigate(`/folders/view/${folderId}`);
  };

  return (
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
          {folders.length === 0 && (
            <Box p="4">
              <Text size="2" color="gray" align="center">
                No folders yet. Create your first folder to get started!
              </Text>
            </Box>
          )}

          {folders.length > 0 && (
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
  );
};

export default ListFolders;
