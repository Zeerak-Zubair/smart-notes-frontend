import { useState } from "react";
import { useParams } from "react-router";

interface ViewNotebookProps {
  notebook_id: number;
}

const ViewNotebook = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  return (
    <>
      <h1>Title:{title}</h1>
      <p>Description:{description}</p>
      <p>Color:{color}</p>
    </>
  );
};

export default ViewNotebook;
