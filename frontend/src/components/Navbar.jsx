import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-base-200 border-b border-base-content/10 fixed top-0 w-full z-10">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary  font-mono tracking-tighter text-shadow-lg text-shadow-primary-content">
            <Link to="/">ThinkBoard</Link>
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
