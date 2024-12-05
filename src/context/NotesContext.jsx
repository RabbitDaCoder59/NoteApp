import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import axios from "axios";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:3001/notes/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotes(); // Fetch notes when the component mounts
  }, [fetchNotes]);

  const addNote = useCallback(
    async (newNote) => {
      try {
        const response = await axios.post("http://localhost:3001/notes", newNote, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setNotes((prevNotes) => [...prevNotes, response.data]); // Optimistic update
        fetchNotes(); // Re-fetch notes to ensure you have the latest data
      } catch (error) {
        console.error("Error adding note:", error);
      }
    },
    [fetchNotes] // Make sure fetchNotes is available here
  );

  return (
    <NotesContext.Provider value={{ notes, addNote, fetchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
