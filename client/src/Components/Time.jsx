import React from "react";
import { useForm } from "react-hook-form";

function TimeRangePicker() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateTimeFormat = (value) => {
    // Regular expression to match HH:mm format
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    // Check for dash and split the value manually
    if (!value.includes("-")) {
      return 'Invalid format. Please use "start-end" (e.g., 09:00-17:00).';
    }

    const [startTime, endTime] = value.split("-").map((time) => time.trim());

    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return 'Invalid time format. Please use "HH:mm-HH:mm" (e.g., 09:00-17:00).';
    }

    return true; // Validation passed
  };

  const onSubmit = (data) => {
    console.log("Time Range Submitted:", data.timeRange);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="timeRange">Time Range (e.g., 09:00-17:00):</label>
      <input
        type="text"
        id="timeRange"
        {...register("timeRange", {
          required: "Time range is required.",
          validate: validateTimeFormat,
        })}
      />
      {errors.timeRange && (
        <p style={{ color: "red" }}>{errors.timeRange.message}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  );
}

export default TimeRangePicker;
