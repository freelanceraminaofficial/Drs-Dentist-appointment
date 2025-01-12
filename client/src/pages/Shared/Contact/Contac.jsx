import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);
  };

  return (
    <div className=" dark:bg-gray-900 p-20">
      <div className="container grid grid-cols-1 items-center justify-center md:grid-cols-2 mx-auto p-16 bg-teal-900 rounded-lg shadow-md">
        {/* Left Section */}
        <div className="pl-10 ">
          <h1 className="text-2xl font-bold text-white mb-4">
            Contact With Us
          </h1>
          <p className="mt-4 text-sm text-gray-200 w-1/2">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>

          <div className="mt-6 text-gray-200">
            <p>
              <span className="font-semibold">Contact:</span> +88 01750 14 14 14
            </p>
            <p>
              <span className="font-semibold">Location:</span> Dhanmondi, Dhaka,
              Bangladesh
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6"
          >
            <div>
              <label className="label">
                <span className="label-text text-white">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your name"
                className="input input-bordered input-md w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="Enter your email"
                className="input input-bordered input-md w-full"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text text-white">Mobile Number</span>
              </label>
              <input
                type="tel"
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid mobile number",
                  },
                })}
                placeholder="Enter your mobile number"
                className="input input-bordered input-md w-full"
              />
              {errors.mobile && (
                <span className="text-red-500 text-sm">
                  {errors.mobile.message}
                </span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text text-white">Doctor Name</span>
              </label>
              <input
                type="text"
                {...register("doctor", { required: "Doctor name is required" })}
                placeholder="Enter doctor name"
                className="input input-bordered input-md w-full"
              />
              {errors.doctor && (
                <span className="text-red-500 text-sm">
                  {errors.doctor.message}
                </span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text text-white">Date</span>
              </label>
              <input
                type="date"
                {...register("date", { required: "Date is required" })}
                className="input input-bordered input-md w-full text-black"
              />
              {errors.date && (
                <span className="text-red-500 text-sm">
                  {errors.date.message}
                </span>
              )}
              <small className="text-gray-400 text-xs">
                Select a date for the appointment
              </small>
            </div>

            <div>
              <label className="label">
                <span className="label-text text-white">Time</span>
              </label>
              <input
                type="time"
                placeholder="Time"
                {...register("time", { required: "Time is required" })}
                className="input input-bordered input-md w-full text-black"
                onChange={(e) => {
                  e.target.blur(); // Removes focus from the input
                }}
              />
              {errors.time && (
                <span className="text-red-500 text-sm">
                  {errors.time.message}
                </span>
              )}
            </div>
          </form>
          <button
            type="submit"
            className="bg-[#F7A582] p-4 rounded-md w-full text-white mt-8 "
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
