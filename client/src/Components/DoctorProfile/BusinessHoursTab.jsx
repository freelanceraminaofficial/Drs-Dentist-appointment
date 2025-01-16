import React from "react";

const BusinessHoursTab = ({ doctor }) => (
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4">Business Hours</h3>
    <table className="table table-zebra w-full">
      <thead>
        <tr>
          <th>Day</th>
          <th>Opening Hours</th>
          <th>Closing Hours</th>
        </tr>
      </thead>
      <tbody>
        {doctor.hours.map((day, index) => (
          <tr key={index}>
            <td>{day.day}</td>
            <td>{day.open || "Closed"}</td>
            <td>{day.close || "Closed"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BusinessHoursTab;
