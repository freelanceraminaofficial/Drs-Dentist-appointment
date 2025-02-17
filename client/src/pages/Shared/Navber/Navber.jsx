import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import useGetUser from "../../../hooks/useGetUser";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { userData, refetch, isLoading, isError } = useGetUser(); // Extract loading and refetch
  console.log(userData);

  const handleLogOut = async () => {
    try {
      await logOut();
      refetch(); // Refetch user data after logout to clear state
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again!");
    }
  };

  useEffect(() => {
    // Trigger the refetch when the user logs in or when user changes
    if (user?.email) {
      refetch();
    }
  }, [user, refetch]); // Only trigger when user changes

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-teal-800">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">+</span>
        </div>
        <span className="text-xl font-semibold text-white">Drs Dentist</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 text-white">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/appointment">Appointment</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {/* Conditionally Render Login/Logout Button */}
        {user ? (
          <button
            onClick={handleLogOut}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
            aria-label="Logout"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
          >
            Login
          </Link>
        )}

        {/* User Dropdown */}
        {user && (
          <div className="flex items-center gap-2">
            {/* Display Username or Loading */}
            <h1 className="text-white font-semibold text-lg">
              {isLoading ? "Loading..." : userData?.username || "User"}
            </h1>

            {/* Dropdown Menu */}
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/add-job" className="justify-between">
                    Add Job
                  </Link>
                </li>
                <li>
                  <Link to="/my-posted-jobs">My Posted Jobs</Link>
                </li>
                <li>
                  <Link to="/my-bids">My Bids</Link>
                </li>
                <li>
                  <Link to="/bid-requests">Bid Requests</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
