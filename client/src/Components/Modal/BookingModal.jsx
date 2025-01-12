import React from "react";
import { useNavigate } from "react-router-dom";

const BookingModal = ({
  state,
  dispatch,
  handleSubmit,
  onSubmit,
  register,
  errors,
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Modify the onSubmit handler to include redirection
  const handleFormSubmit = (data) => {
    onSubmit(data); // Call the existing onSubmit logic
    navigate("/dashboard/appointmenttable"); // Redirect to the desired route
  };

  return (
    <div
      className={`fixed inset-0 flex justify-center items-end md:items-center bg-black bg-opacity-50 
      transition-opacity duration-300 ease-in-out ${
        state.isModalOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-t-lg shadow-lg p-6 w-full md:w-1/2 lg:w-1/3 transform transition-transform duration-300 ease-in-out ${
          state.isModalOpen ? "translate-y-0" : "translate-y-10"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cavity Protection</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            aria-label="Close modal"
            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Selected Date */}
          <div>
            <label htmlFor="date" className="block mb-1 text-sm font-medium">
              Selected Date
            </label>
            <input
              type="text"
              id="date"
              value={state.selectedDate}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-200 cursor-not-allowed"
            />
          </div>

          {/* Time Selection */}
          <div>
            <label htmlFor="time" className="block mb-1 text-sm font-medium">
              Time
            </label>
            <select
              id="time"
              defaultValue=""
              {...register("time", { required: "Time is required" })}
              className={`w-full p-2 border rounded-md ${
                errors.time ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="" disabled className="text-gray-400">
                e.g., 10:05 am - 11:30 am
              </option>
              <option value="07:00am-12:00am">07:00 am - 12:00 am</option>
              <option value="6:00pm-10:00pm">6:00 pm - 10:00 pm</option>
            </select>
            {errors.time && (
              <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block mb-1 text-sm font-medium"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter your full name"
              className={`w-full p-2 border rounded-md ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-1 text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be 11 digits",
                },
              })}
              placeholder="Enter your phone number"
              className={`w-full p-2 border rounded-md ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter your email"
              className={`w-full p-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
