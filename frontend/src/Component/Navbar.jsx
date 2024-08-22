import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const isSignedIn = !!localStorage.getItem("token"); // Check if token exists

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 text-white p-4 z-20 shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <Link
                  to="/accountsettings"
                  className="text-gray-800 font-semibold hover:text-blue-500 transition duration-300"
                >
                  Update Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 font-semibold hover:text-blue-500 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 font-semibold hover:text-blue-500 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 font-semibold hover:text-blue-500 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-800 focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
