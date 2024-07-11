// src/pages/Notes.jsx
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { NotesContext } from "../context/NotesContext";
import { useLoading } from "../context/LoadingContext";
import Loader from "../components/Loader";

const Notes = () => {
  const { fetchNotes } = useContext(NotesContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/notes/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setNote(response.data);
        console.log(response.data);
        setTimeout(() => setLoading(false), 4000);
      })
      .catch((error) => {
        console.error("Error fetching note:", error);
        setLoading(false);
      });
  }, [id, setLoading]);

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .put(`http://localhost:3001/notes/note/${id}`, note, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        fetchNotes();
        setIsEditing(false);
        setTimeout(() => setLoading(false), 4000);
      })
      .catch((error) => {
        console.error("Error saving note:", error);
        setLoading(false);
      });
  };

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:3001/notes/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        fetchNotes();
        navigate("/");
        setTimeout(() => setLoading(false), 4000);
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Loader />
      </div>
    );
  }

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-bgColors text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate("/")} className="text-gray-400">
          <FaChevronLeft size={28} />
        </button>
        <div className="flex space-x-4">
          <button onClick={() => setIsEditing(true)} className="text-green-500">
            <LiaEdit size={32} />
          </button>
          <button onClick={handleDelete} className="text-red-500">
            <MdDelete size={32} />
          </button>
          {isEditing && (
            <button onClick={handleSave} className="text-blue-500">
              <FaSave size={28} />
            </button>
          )}
        </div>
      </div>
      <div className="flex-grow w-full h-100">
        <textarea
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={handleEdit}
          readOnly={!isEditing}
          className={`Title w-full h-22 bg-transparent font-bold text-2xl text-gray-400 focus:outline-none resize-none ${
            isEditing ? "editable" : "read-only"
          }`}
        />
        <textarea
          name="content"
          placeholder="Type something..."
          value={note.content}
          onChange={handleEdit}
          readOnly={!isEditing}
          className={`w-full h-full bg-transparent text-lg text-gray-400 focus:outline-none resize-none ${
            isEditing ? "editable" : "read-only"
          }`}
        />
      </div>
    </div>
  );
};

export default Notes;
