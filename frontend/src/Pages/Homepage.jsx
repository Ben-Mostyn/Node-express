import { useEffect } from "react";
import { useState } from "react";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/notes");
        const data = await res.json();
        setNotes(data);
        console.log(notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/notes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(res.status);
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => handleDeleteNote(note._id)}>
            Delete Note
          </button>
        </div>
      ))}
    </div>
  );
};

export default Homepage;
