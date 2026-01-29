import { Route, Routes } from "react-router";
import Homepage from "./Pages/Homepage/Homepage";
import CreatePage from "./Pages/CreatePage";
import NoteDetails from "./Pages/NoteDetails";
// import toast from "react-hot-toast";
import Navbar from "./Components/Navbar/Navbar";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note-details:id" element={<NoteDetails />} />
      </Routes>
    </div>
  );
};

export default App;
