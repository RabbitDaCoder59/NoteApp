import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { NotesContext } from "../context/NotesContext";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import BASE_URL from "../utils/url";
const Notes = () => {
  const { fetchNotes } = useContext(NotesContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/notes/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setNote(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
      });
  }, [id]);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios
      .put(`${BASE_URL}/notes/note/${id}`, note, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        fetchNotes();
        setIsEditing(false);
        toast.success("Note saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving note:", error);
        toast.error("Failed to save the note.");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${BASE_URL}/notes/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        fetchNotes();
        navigate("/");
        // Set a flag in localStorage indicating note was deleted
        localStorage.setItem("noteDeleted", "true");
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        toast.error("Failed to delete the note.");
      });
  };
  

  return (
    <div className="flex flex-col h-full bg-bgColors text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate("/")} className="text-gray-400">
          <FaChevronLeft size={28} />
        </button>
        <div className="flex space-x-4">
          <button aria-label="edit" onClick={() => setIsEditing(true)} className="text-green-500">
            <LiaEdit size={32} />
          </button>
          <button aria-label="delete" onClick={handleDelete} className="text-red-500">
            <MdDelete size={32} />
          </button>
          {isEditing && (
            <button aria-label="Save" onClick={handleSave} className="text-blue-500">
              <FaSave size={28} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-grow w-full h-100">
        <textarea
          data-testid="note-title"
          type="text"
          name="title"
          placeholder="Title"
          value={note?.title}
          onChange={handleEdit}
          readOnly={!isEditing}
          className={`Title w-full h-22 bg-transparent font-bold text-2xl text-gray-400 focus:outline-none resize-none ${
            isEditing ? "editable" : "read-only"
          }`}
        />
        <textarea
          name="content"
          placeholder="Type something..."
          value={note?.content}
          onChange={handleEdit}
          readOnly={!isEditing}
          className={`w-full h-full bg-transparent text-lg text-gray-400 focus:outline-none resize-none ${
            isEditing ? "editable" : "read-only"
          }`}
        />
      </div>
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

export default Notes;
