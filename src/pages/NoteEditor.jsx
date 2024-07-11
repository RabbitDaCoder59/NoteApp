// src/pages/NoteEditor.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaSave } from "react-icons/fa";
import axios from "axios";
import { useLoading } from "../context/LoadingContext";
import Loader from "../components/Loader";

const NoteEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { loading, setLoading } = useLoading(); // Use loading context

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, [setLoading]);

  const handleSave = () => {
    if (loading) return;

    const userId = parseInt(localStorage.getItem("userId"));
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("Error: Access token is missing.");
      return;
    }

    const data = {
      title: title,
      content: content,
      userId: userId,
    };

    setLoading(true);

    axios
      .post("http://localhost:3001/notes", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        setTimeout(() => {
          navigate("/");
          setLoading(false);
        }, 4000); // Simulate a delay of 4 seconds
      })
      .catch((error) => {
        console.log("Error creating note:", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col h-full bg-bgColors text-white p-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <button className="text-gray-400" onClick={() => navigate("/")}>
          <FaChevronLeft size={28} />
        </button>
        <div className="flex space-x-4">
          <button
            className="text-gray-400"
            onClick={handleSave}
            disabled={loading}
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
    </div>
  );
};

export default NoteEditor;
