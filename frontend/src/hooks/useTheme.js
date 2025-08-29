import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(darkQuery.matches ? "dark" : "light");

    const handler = (e) => setTheme(e.matches ? "dark" : "light");
    darkQuery.addEventListener("change", handler);

    return () => darkQuery.removeEventListener("change", handler);
  }, []);

  return theme;
};

export default useTheme;
