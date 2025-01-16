import React from "react";

const OverviewTab = ({ doctor }) => {
  return (
    <div className="p-6">
      <h3 className="text-lg font-bold mb-4">About Me</h3>
      <p className="text-gray-600 mb-6">
        {doctor.about || "No information available."}
      </p>

      <h4 className="text-md font-semibold mb-2">Education</h4>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        {doctor.education?.length > 0 ? (
          doctor.education.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No education data available.</li>
        )}
      </ul>

      <h4 className="text-md font-semibold mb-2">Work & Experience</h4>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        {doctor.experience?.length > 0 ? (
          doctor.experience.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No experience data available.</li>
        )}
      </ul>

      <h4 className="text-md font-semibold mb-2">Services</h4>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        {doctor.services?.length > 0 ? (
          doctor.services.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No services data available.</li>
        )}
      </ul>

      <h4 className="text-md font-semibold mb-2">Awards</h4>
      <ul className="list-disc list-inside text-gray-600 mb-6">
        {doctor.awards?.length > 0 ? (
          doctor.awards.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No awards data available.</li>
        )}
      </ul>

      <h4 className="text-md font-semibold mb-2">Specializations</h4>
      <ul className="list-disc list-inside text-gray-600">
        {doctor.specializations?.length > 0 ? (
          doctor.specializations.map((item, index) => (
            <li key={index}>{item}</li>
          ))
        ) : (
          <li>No specializations data available.</li>
        )}
      </ul>
    </div>
  );
};

export default OverviewTab;
