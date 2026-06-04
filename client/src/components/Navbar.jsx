import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="h-16 px-8 bg-white border-b flex items-center justify-between">
      <Link
        to="/dashboard"
        className="font-bold text-xl"
      >
        Lead CRM
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="font-medium"
        >
          Dashboard
        </Link>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold"
          >
            {user?.name?.charAt(0).toUpperCase()}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-60 bg-white border rounded-xl shadow-lg">
              <div className="p-4 border-b">
                <p className="font-semibold">
                  {user?.name}
                </p>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;