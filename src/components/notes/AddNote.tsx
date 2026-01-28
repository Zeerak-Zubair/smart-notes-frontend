import { useState, type FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  TextField,
  Callout,
} from "@radix-ui/themes";
import { InfoCircledIcon, CheckIcon } from "@radix-ui/react-icons";

// interface AddNotesProps {
//   id: number;
//   created_at: Date;
//   notebook_id: number;
//   content: string;
//   order_index: number;
//   updated_at: Date;
// }

const AddNote = () => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    setShowError(false);
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "link",
    "image",
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(content);
    if (!content || content.trim() === "<p><br></p>") {
      setShowError(true);
      setShowSuccess(false);
      return;
    }
    console.log("Submitted Valid Content:", content);
    console.log("Title:", title);
    setShowSuccess(true);
    setShowError(false);
    // Reset form after successful submission
    setTimeout(() => {
      setContent("");
      setTitle("");
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <Box p="6" maxWidth="900px" mx="auto">
      <Heading size="8" mb="6">
        Add Note
      </Heading>

      <Card size="3">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            {showError && (
              <Callout.Root color="red">
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                  Content cannot be empty! Please add some content to your note.
                </Callout.Text>
              </Callout.Root>
            )}

            {showSuccess && (
              <Callout.Root color="green">
                <Callout.Icon>
                  <CheckIcon />
                </Callout.Icon>
                <Callout.Text>
                  Note saved successfully! The form will reset shortly.
                </Callout.Text>
              </Callout.Root>
            )}

            <Box>
              <label htmlFor="note-title">
                <Heading size="3" mb="2">
                  Title
                </Heading>
              </label>
              <TextField.Root
                id="note-title"
                size="3"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>

            <Box>
              <Heading size="3" mb="2">
                Content
              </Heading>
              <Box
                style={{
                  minHeight: "300px",
                  borderRadius: "var(--radius-3)",
                  overflow: "hidden",
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={handleContentChange}
                  modules={modules}
                  formats={formats}
                  style={{ height: "250px" }}
                />
              </Box>
            </Box>

            <Flex gap="3" mt="4" justify="end">
              <Button
                type="button"
                variant="soft"
                color="gray"
                size="3"
                onClick={() => {
                  setContent("");
                  setTitle("");
                  setShowError(false);
                  setShowSuccess(false);
                }}
              >
                Clear
              </Button>
              <Button type="submit" size="3">
                Save Note
              </Button>
            </Flex>
          </Flex>
        </form>
      </Card>
    </Box>
  );
};

export default AddNote;
