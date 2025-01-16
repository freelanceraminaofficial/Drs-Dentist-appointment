import { useState, useEffect } from "react";
import axios from "axios";

const useFetchDoctors = () => {
  const [doctors, setDoctors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("/Doctors.json");
        setDoctors(response.data);
      } catch (err) {
        setError("Failed to fetch doctors' data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctors, loading, error };
};

export default useFetchDoctors;
