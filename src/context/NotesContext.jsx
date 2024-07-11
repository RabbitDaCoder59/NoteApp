import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import { useLoading } from "./LoadingContext";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { setLoading } = useLoading(); // This should now work as the LoadingProvider is wrapping the component tree

  const fetchNotes = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const addNote = useCallback(
    async (newNote) => {
      try {
        await axios.post("http://localhost:3001/notes", newNote, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        fetchNotes();
      } catch (error) {
        console.error("Error adding note:", error);
      }
    },
    [fetchNotes]
  );

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <NotesContext.Provider value={{ notes, addNote, fetchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
