import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NotesContext } from "../context/NotesContext"; // Ensure this path is correct
import { formatDate, trimContent } from "../utils/utility";

const Card = () => {
  const navigate = useNavigate();
  const { notes } = useContext(NotesContext);

  return (
    <div className="content px-6 lg:px-18 mb-10">
      <div className="Notes grid place-items-center grid-cols-1 lg:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            id={note.id}
            className="card relative"
            style={{ backgroundColor: note.notecolor }}
            onClick={() => navigate(`/notes/${note.id}`)}
          >
            <div className="px-6 py-4">
              <div className="font-bold text-2xl mb-2">
                {trimContent(note.title, 20)}
              </div>
              <div className="text-gray-700 w-full h-[70px] text-wrap text-base break-words overflow-hidden">
                {trimContent(note.content, 100)}
              </div>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="text-gray-500 text-sm">
                {formatDate(note.date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
