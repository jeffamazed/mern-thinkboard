import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailsPage from "./pages/NoteDetailsPage";
import Layout from "./components/Layout";
import NotesProvider from "./provider/NotesProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NotesProvider>
        <Layout />
      </NotesProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "/create", element: <CreatePage /> },
      { path: "/note/:id", element: <NoteDetailsPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
