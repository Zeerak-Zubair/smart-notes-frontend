import { useParams } from "react-router";

const ViewNotebook = () => {
  const { id } = useParams();

  return (
    <>
      <h1>Notebook {id}</h1>
      <p>View notebook details here.</p>
    </>
  );
};

export default ViewNotebook;
