import { useState } from "react";
import { useNavigate } from "react-router";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      if (!res.ok) {
        throw new Error(res.status);
      }
      navigate("/");
    } catch (error) {
      console.log({ error, message: "error creating note" });
    }
  };

  return (
    <div>
      <h1>Create a Note here</h1>

      <form onSubmit={handleSubmit}>
        <h3>Title</h3>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <h3>Content</h3>
        <textarea
          name="content"
          required
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePage;
