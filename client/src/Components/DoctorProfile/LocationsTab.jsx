import React from "react";

const LocationsTab = ({ doctor }) => (
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4">Locations</h3>
    {doctor.locations.map((location, index) => (
      <div
        key={index}
        className="p-4 mb-4 border rounded-lg bg-gray-50 shadow-sm"
      >
        <h4 className="text-md font-semibold">{location.name}</h4>
        <p className="text-gray-600">{location.address}</p>
        <p className="text-gray-600">{location.hours}</p>
      </div>
    ))}
  </div>
);

export default LocationsTab;
