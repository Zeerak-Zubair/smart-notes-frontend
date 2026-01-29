import { useNavigate } from "react-router";
import { Card, Flex, Heading, IconButton, Text, Badge } from "@radix-ui/themes";
import { type Note } from "../../services/api/notes.api";

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  const navigate = useNavigate();

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
          onClick={() => navigate(`/notes/view/${note.id}`)}
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
  );
};

export default NotesList;
