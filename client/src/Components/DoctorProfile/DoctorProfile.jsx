import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import OverviewTab from "./OverviewTab";
import LocationsTab from "./LocationsTab";
import ReviewsTab from "./reviewsTab";
import BusinessHoursTab from "./BusinessHoursTab";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null); // Change to a single doctor object
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = ["overview", "locations", "reviews", "business-hours"];

  useEffect(() => {
    axiosPublic
      .get(`/doctor/${id}`) // Fetch a single doctor by ID
      .then((response) => {
        setDoctor(response.data); // Save the single doctor object
      })
      .catch((error) => console.error("Error fetching doctor:", error));
  }, [id]);

  const renderTabContent = () => {
    if (!doctor) return <div className="text-gray-500">Doctor not found.</div>;

    switch (activeTab) {
      case "overview":
        return <OverviewTab doctor={doctor} />;
      case "locations":
        return <LocationsTab doctor={doctor} />;
      case "reviews":
        return <ReviewsTab doctor={doctor} />;
      case "business-hours":
        return <BusinessHoursTab doctor={doctor} />;
      default:
        return <div className="text-gray-500">Invalid tab selected.</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {doctor ? (
        <>
          <div className="flex items-center space-x-4">
            <img
              src={doctor?.image || "/placeholder.jpg"} // Fallback image
              alt={`${doctor?.name || "Doctor"}'s profile`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">{doctor?.name || "N/A"}</h1>
              <p className="text-gray-500">{doctor?.specialty || "N/A"}</p>
              <p className="text-gray-500">{doctor?.location || "N/A"}</p>
            </div>
          </div>

          <div className="mt-6 border-b border-gray-200">
            <div className="tabs">
              {tabs.map((tab) => (
                <a
                  key={tab}
                  className={`tab tab-lifted ${
                    activeTab === tab ? "tab-active bg-primary text-white" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.replace("-", " ")}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6">{renderTabContent()}</div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-500">
          {doctor === null ? "Loading doctor details..." : "Doctor not found."}
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
