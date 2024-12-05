import React, { useContext, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Emptynote from "../components/Emptynote";
import { NotesContext } from "../context/NotesContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { notes, fetchNotes } = useContext(NotesContext);

  const handleToast = () => {
    // Check for login success
    const loginSuccess = localStorage.getItem("loginSuccess");
    if (loginSuccess === "true") {
      toast.success("Login successful!");
      localStorage.removeItem("loginSuccess"); // Clear the flag
    }

    // Check for note creation or deletion flags
    const noteCreated = localStorage.getItem("noteCreated");
    if (noteCreated === "true") {
      toast.success("Note created successfully!");
      localStorage.removeItem("noteCreated");
    }

    const noteDeleted = localStorage.getItem("noteDeleted");
    if (noteDeleted === "true") {
      toast.success("Note deleted successfully!");
      localStorage.removeItem("noteDeleted");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchNotes();
    }
    handleToast(); // Handle all toast notifications
  }, [fetchNotes]);

  return (
    <div className="relative lg:w-full lg:h-full h-full min-h-[490px] lg:min-h-[417px] px-1 my-6 lg:mt-10">
      {notes.length === 0 ? <Emptynote /> : <Card />}
      <Link
        to="/notes/new"
        className="createBtn bg-btn drop-shadow-2xl px-6 py-6 rounded-full fixed right-9 top-120 lg:top-[28rem] lg:right-24 z-20"
      >
        <FiPlus className="icon" />
      </Link>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        theme="colored"
        hideProgressBar={true}
        draggable
      />
    </div>
  );
};

export default Home;
