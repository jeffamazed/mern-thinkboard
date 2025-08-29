import { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router";
import { pageTitles, skippedPath } from "../constants/constants.js";
import useNotes from "./useNotes.js";

const usePageTitleAndFocus = (defaultTitle = "ThinkBoard") => {
  const location = useLocation();
  const mainRef = useRef(null);
  const params = useParams();
  const { data, singleNote } = useNotes();

  useEffect(() => {
    let title = pageTitles[location.pathname];

    if (!title) {
      // handle dynamic route
      const id = params.id;
      const note = data?.notes?.find((n) => n._id === id);
      if (!note) {
        title = singleNote?.title
          ? `${singleNote.title} - ThinkBoard`
          : defaultTitle;
      } else {
        title = note?.title ? `${note.title} - ThinkBoard` : defaultTitle;
      }
    }

    const skip = skippedPath.some((path) => location.pathname.startsWith(path));
    if (mainRef.current && !skip) mainRef.current.focus();
    document.title = title;
  }, [location, defaultTitle, params.id, data, singleNote]);

  return mainRef;
};

export default usePageTitleAndFocus;
