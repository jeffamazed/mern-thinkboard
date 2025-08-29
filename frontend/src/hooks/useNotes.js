import { useContext } from "react";
import NotesContext from "../context/NotesContext.js";

const useNotes = () => {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider!");

  return ctx;
};

export default useNotes;
