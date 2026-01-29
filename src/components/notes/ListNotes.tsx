import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  Grid,
  Heading,
  IconButton,
  Button,
  TextField,
  Card,
  Avatar,
} from "@radix-ui/themes";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  DotsVerticalIcon,
  ChatBubbleIcon,
  MixerHorizontalIcon, 
} from "@radix-ui/react-icons";
import { NotesApiService, type Note } from "../../services/api/notes.api";

interface ListNotesProps {
  notebookId: string;
}

const ListNotes = ({ notebookId }: ListNotesProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await NotesApiService.getNotes(notebookId);
        setNotes(response.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (notebookId) {
       fetchNotes();
        }
  }, [notebookId]);

  // Helper to extract year from date
  const getYear = (dateStr: Date | string) => {
    return new Date(dateStr).getFullYear();
  };

  // Helper to strip HTML for preview
  const getPreview = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return (temp.textContent || temp.innerText || "").substring(0, 150) + "...";
  };

  return (
    <Box style={{ background: "var(--gray-2)", minHeight: "100vh", padding: "24px" }}>
      {/* Top Filter Bar */}
      <Flex justify="between" align="center" mb="5" wrap="wrap" gap="3">
        <Flex gap="4" align="center">
          <Text weight="bold" size="3" style={{ cursor: "pointer" }}>All notes</Text>
          <Flex align="center" gap="2" style={{ cursor: "pointer", color: "var(--gray-10)" }}>
            <Box style={{ width: 8, height: 8, borderRadius: "50%", background: "#eab308" }} />
            <Text size="2">Theoretical</Text>
          </Flex>
          <Flex align="center" gap="2" style={{ cursor: "pointer", color: "var(--gray-10)" }}>
            <Box style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
            <Text size="2">Empirical</Text>
          </Flex>
          <Flex align="center" gap="2" style={{ cursor: "pointer", color: "var(--gray-10)" }}>
             <Box style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
            <Text size="2">Recent work</Text>
          </Flex>
          <Flex align="center" gap="2" style={{ cursor: "pointer", color: "var(--gray-10)" }}>
            <Box style={{ width: 8, height: 8, borderRadius: "50%", background: "#64748b" }} />
            <Text size="2">Others</Text>
          </Flex>
        </Flex>

        {/* Right Actions */}
        <Flex gap="3" align="center">
           <TextField.Root placeholder="Search..." style={{ width: 200 }}>
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
           </TextField.Root>
           
           <Text size="2" color="gray">
             {notes.length} of {notes.length} notes
           </Text>

           <IconButton variant="ghost" color="gray">
                <MixerHorizontalIcon />
           </IconButton>

           <Button size="2" style={{ borderRadius: "20px", padding: "0 20px" }}>
                <PlusIcon /> Create new
           </Button>
        </Flex>
      </Flex>

      {/* Grid Content */}
      {isLoading ? (
        <Flex justify="center" p="5">
             <Text color="gray">Loading notes...</Text>
        </Flex>
      ) : (
        <Grid columns={{ initial: "1", sm: "2", md: "3", lg: "4" }} gap="4">
          {notes.map((note) => (
            <Card key={note.id} size="2" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Flex direction="column" height="100%" justify="between">
                  <Box>
                      {/* Card Header: Year + Category + Menu */}
                      <Flex justify="between" align="start" mb="2">
                          <Flex gap="2" align="center">
                              <Badge variant="solid" color="ruby" radius="full" style={{ padding: "0 8px" }}>
                                  {getYear(note.created_at)}
                              </Badge>
                              <Text size="1" color="gray" style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  Trends in Cognitive Sciences {/* Mock Data */}
                              </Text>
                          </Flex>
                           <IconButton size="1" variant="ghost" color="gray">
                              <DotsVerticalIcon />
                           </IconButton>
                      </Flex>

                      {/* Title */}
                      <Heading size="4" mb="2" style={{ lineHeight: "1.2" }}>
                          {note.title || "Untitled Note"}
                      </Heading>

                      {/* Content Preview */}
                      <Text size="2" color="gray" style={{ lineHeight: "1.5" }}>
                          {getPreview(note.content)}
                      </Text>
                  </Box>

                  {/* Footer */}
                  <Flex justify="between" align="center" mt="4">
                      <Flex align="center" gap="2">
                           <ChatBubbleIcon width="14" height="14" color="var(--gray-9)" />
                           <Text size="1" weight="bold">14</Text> {/* Mock Data */}
                      </Flex>
                      
                       <Flex align="center" gap="1">
                           <Avatar size="1" fallback="U" radius="full" /> 
                           {/* Mocking multiple avatars or status dot */}
                           <Box style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                       </Flex>
                  </Flex>
              </Flex>
            </Card>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ListNotes;
