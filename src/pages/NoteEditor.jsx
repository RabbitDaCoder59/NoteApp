import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast

const NoteEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
  const handleSave = async () => {
    if (!title) {
      toast.error("Please enter a title for your note!");
      return;
    }
  
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userId = JSON.parse(localStorage.getItem("userId"));
  
      if (!accessToken) {
        console.log("Error: Access token is missing."); // This should log correctly
        return;
      }
  
      await axios.post(
        "http://localhost:3001/notes",
        { title, content, userId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
  
      localStorage.setItem("noteCreated", "true");
      navigate("/");
  
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="flex flex-col h-full bg-bgColors text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-400" onClick={() => navigate("/")}>
          <FaChevronLeft size={28} />
        </button>
        <div className="flex space-x-4">
          <button
            aria-label="Save"
            className="text-gray-400"
            onClick={handleSave}
          >
            <FaSave size={28} />
          </button>
        </div>
      </div>
      <div className="flex-grow w-full h-100">
        <textarea
          type="text"
          placeholder="Title"
          className="Title w-full h-22 bg-transparent font-bold text-2xl text-gray-400 focus:outline-none resize-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Type something..."
          className="w-full h-30 lg:h-full bg-transparent text-lg text-gray-400 focus:outline-none resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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

export default NoteEditor;
