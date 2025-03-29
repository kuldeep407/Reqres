import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { token, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="w-full shadow-lg bg-[#f8f8f8] fixed top-0 z-50 ">
      <div className="w-[80%] mx-auto px-6 py-4 flex justify-between items-center">
        <ul className="flex space-x-6 sm:space-x-8 text-base sm:text-lg font-medium">
          {isLoggedIn && (
            <li className="cursor-pointer hover:text-[#ff4141] transition-colors text-[#252525] text-base sm:text-lg font-medium justify-center text-center">
              <NavLink to="/users">Users</NavLink>
            </li>
          )}
        </ul>

        <ul className="flex space-x-4 sm:space-x-6 text-sm sm:text-base">
          {!isLoggedIn ? (
            <li>
              <NavLink
                to="/"
                className="border rounded-full px-2 sm:px-4 py-1 cursor-pointer hover:text-[#ff4141] transition-colors text-[#252525] text-base sm:text-lg font-medium justify-center text-center"
              >
                Login
              </NavLink>
            </li>
          ) : (
            <li>
              <button
                className="border rounded-full px-2 sm:px-4 py-1 cursor-pointer hover:text-[#ff4141] transition-colors text-[#252525] text-base sm:text-lg font-medium justify-center text-center"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
