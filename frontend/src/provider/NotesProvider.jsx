import NotesContext from "../context/NotesContext.js";
import { useState } from "react";

const NotesProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [singleNote, setSingleNote] = useState({});

  return (
    <NotesContext.Provider value={{ data, setData, singleNote, setSingleNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
