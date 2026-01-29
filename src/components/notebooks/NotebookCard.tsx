import { useNavigate } from "react-router";
import { type Notebook } from "../../services/api/notebooks.api";
import { Box, Flex, Heading, Text, IconButton } from "@radix-ui/themes";

interface NotebookCardProps {
  notebook: Notebook;
  onClick?: () => void;
  selected?: boolean;
}

const NotebookCard = ({ notebook, onClick, selected }: NotebookCardProps) => {
  const navigate = useNavigate();

  return (
    <Box
      style={{
        backgroundColor: notebook.color || "#fcd34d",
        borderRadius: "24px",
        padding: "24px",
        height: "280px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: selected 
            ? "0 0 0 4px var(--accent-9), 0 4px 6px -1px rgba(0, 0, 0, 0.1)" 
            : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        transform: selected ? "scale(1.02)" : "none",
        color: "#1f2937",
        marginBottom: "16px", // Space if stacked in column
      }}
      onClick={onClick || (() => navigate(`/notebooks/view/${notebook.id}`))}
      onMouseEnter={(e) => {
        if (!selected) {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
        }
      }}
    >
      {/* Top content: Title and Star */}
      <Flex justify="between" align="start">
        <Heading
          size="6"
          weight="medium"
          style={{
            lineHeight: "1.3",
            maxWidth: "85%",
            wordBreak: "break-word",
            color: "#1f2937",
            fontFamily: "var(--font-heading)",
          }}
        >
          {notebook.title}
        </Heading>
        
        {/* Star Icon (Visual Only) */}
         <Box
            style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#1f2937",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fcd34d",
            }}
         >
             <Text size="3">★</Text>
         </Box>
      </Flex>

      {/* Bottom content: Date and Edit Button */}
      <Flex justify="between" align="end" mt="4">
        <Text size="2" weight="medium" style={{ opacity: 0.8 }}>
          {new Date(notebook.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>

        <IconButton
          size="3"
          radius="full"
          style={{
            backgroundColor: "#1f2937",
            color: "white",
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/notebooks/edit/${notebook.id}`);
          }}
        >
         <Text size="4">✎</Text>
        </IconButton>
      </Flex>
    </Box>
  );
};

export default NotebookCard;
