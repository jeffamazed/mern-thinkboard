import { Outlet } from "react-router";
import usePageTitleAndFocus from "../hooks/usePageTitleAndFocus";
import Navbar from "./Navbar";
import { ToastContainer, Zoom } from "react-toastify";
import useTheme from "../hooks/useTheme";

const Layout = () => {
  const mainRef = usePageTitleAndFocus("ThinkBoard", { skipFocus: false });
  const theme = useTheme();
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick={true}
        transition={Zoom}
        pauseOnFocusLoss
        aria-label="Notification"
        limit={3}
        theme={theme}
        toastStyle={{
          padding: "0.5rem 0.75rem",
          fontSize: "0.8rem",
          borderRadius: "0.375rem",
          whiteSpace: "nowrap",
        }}
      />
      <Navbar />
      <main ref={mainRef} className="outline min-h-dvh relative" tabIndex={-1}>
        <div className="dark:styling-dark styling-light"></div>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
