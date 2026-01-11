import React, { useState, type FormEvent } from "react";
import ReactQuill from "react-quill-new";
import { useParams } from "react-router";

const EditNote = () => {
  const [content, setContent] = useState("");

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
      alert("Content cannot be empty!");
      return;
    }
    console.log("Submitted Valid Content:", content);
  };

  return (
    <>
      <h1>Add Note</h1>
      {/* This needs the the Rich Text Editor */}
      <form onSubmit={handleSubmit}>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default EditNote;
