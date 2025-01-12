import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import DoctorsSection from "./DoctorsSection";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/Doctors.json"); // Fetching from public folder
        setDoctors(response.data); // Set the data to the state
      } catch (err) {
        setError("Error fetching doctors data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []); // Runs only once when the component mounts

  if (loading) {
    return <p>Loading...</p>; // Loading message while data is being fetched
  }

  if (error) {
    return <p>{error}</p>; // Error message if fetching fails
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-52 py-20">
      {doctors.map((item, index) => (
        <DoctorsSection key={index} item={item} /> // Pass each doctor data to DoctorsSection component
      ))}
    </div>
  );
};

export default DoctorsList;
