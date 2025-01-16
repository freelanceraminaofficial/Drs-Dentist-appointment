import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "tailwindcss/tailwind.css";

const CustomCalendar = () => {
  // Initialize with today's date
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex flex-col items-end pr-8 space-y-4">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="calendar-overlay"
        className="bg-teal-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 focus:outline-none transition-all"
      >
        {date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </button>

      {isOpen && (
        <div className="absolute top-28 right-14 z-10 transition-all duration-300 origin-top border rounded-full shadow-md ">
          <Calendar
            id="calendar-overlay"
            value={date}
            onChange={(e) => {
              setDate(e.value);
              setIsOpen(false); // Close dropdown on date selection
            }}
            inline
            className="border rounded-lg shadow-md bg-white"
            monthNavigator
            yearNavigator
            yearRange="2000:2030"
          />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
