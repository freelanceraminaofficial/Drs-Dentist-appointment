import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-500">Sorry</p>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        This page is not found
      </h1>
      <img
        src="https://i.ibb.co.com/tpL92r1/Frame.png" // Replace with your own 404 image URL
        alt="404 Not Found"
        className="w-64 mb-6"
      />
      <Link to="/">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
