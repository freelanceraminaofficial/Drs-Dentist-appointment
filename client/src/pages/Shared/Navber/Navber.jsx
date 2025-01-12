import React from "react";
import { Link } from "react-router-dom";

const Navber = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-teal-800">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">+</span>
        </div>
        <span className="text-xl font-semibold text-white">Drs Dentist</span>
      </div>
      <ul className="flex space-x-6 text-white">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link>About</Link>
        </li>
        <li>
          <Link to="/appointment">Appointment</Link>
        </li>
        <li>
          <Link>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navber;
