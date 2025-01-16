import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useGetUser from "../../../hooks/useGetUser";

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  const [userData, refetch, isPending] = useGetUser();

  const handleLogOut = async () => {
    try {
      await logOut();
      console.log("User logged out successfully");
      refetch(); // Refetch user data after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-teal-800">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">+</span>
        </div>
        <span className="text-xl font-semibold text-white">Drs Dentist</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex space-x-6 text-white">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/appointment">Appointment</Link>
        </li>
      </ul>

      {/* User Section */}
      {isPending ? (
        <div>Loading...</div>
      ) : userData ? (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-white font-semibold text-lg">
              {userData.username || "Guest"}
            </h1>
            <div
              tabIndex={0}
              role="button"
              aria-label="User menu"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={userData.photoURL || "/default-avatar.png"}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
