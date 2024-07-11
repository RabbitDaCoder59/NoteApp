import React, { useContext, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import Emptynote from "../components/Emptynote";
import { NotesContext } from "../context/NotesContext";

const Home = () => {
  const { notes, fetchNotes } = useContext(NotesContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchNotes();
    }
  }, [fetchNotes]);

  return (
    <div className="relative lg:w-full lg:h-full h-full min-h-[490px] lg:min-h-[417px] px-1 my-6 lg:mt-10">
      {notes.length === 0 ? <Emptynote /> : <Card />}
      <Link
        to="/notes/new"
        className="createBtn bg-btn drop-shadow-2xl px-6 py-6 rounded-full fixed right-9 top-120 lg:top-[38rem] lg:right-24 z-20"
      >
        <FiPlus className="icon" />
      </Link>
    </div>
  );
};

export default Home;
