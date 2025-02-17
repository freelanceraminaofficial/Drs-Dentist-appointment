import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGetUser from "../../hooks/useGetUser"; // Import useGetUser correctly
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const { createUser, updateUserProfile, setUser } = useAuth(); // Destructure setUser from AuthContext
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Destructure the object returned by useGetUser
  const { userData, refetch } = useGetUser(); // Correctly destructure `userData` and `refetch`

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      // Create user with Firebase
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // Update user profile only with `photoURL`
      await updateUserProfile(data.name, data.photoURL);

      // Manually update the `AuthContext` state to include `username`
      setUser({
        ...user,
        username: data.username, // Add the username manually
        photoURL: data.photoURL,
      });

      // Refetch user data after creating the user
      refetch(); // Refetch the user data from useGetUser

      // Prepare user data for backend or local storage
      const userInfo = {
        name: data.name,
        email: data.email,
        username: data.username,
        photoURL: data.photoURL,
      };

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(userInfo));

      // Optional: Send user data to your backend
      await axiosPublic.post("/users", userInfo);

      // Clear the form
      reset();

      // Show success alert
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirect to home page or desired route
      navigate("/");
    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create user. Please try again!",
      });
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel with Image */}
      <div className="w-1/2 bg-[#07332F] flex items-center justify-center">
        <div className="text-center">
          <img
            src="https://i.ibb.co/TcBJTFm/Screenshot-10.png"
            alt="Doctor Illustration"
            className="w-full mx-auto"
          />
        </div>
      </div>

      {/* Right Panel with Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Sign Up to Doc House
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  validate: (value) =>
                    /^[A-Z][a-z]*\s[A-Z][a-z]*$/.test(value) ||
                    "Name must be in Proper Case format.",
                })}
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Username Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "Username is required",
                  validate: (value) =>
                    /^[a-z]+[a-z0-9]*$/.test(value) ||
                    "Username must be lowercase and include numbers.",
                })}
                className={`input input-bordered w-full ${
                  errors.username ? "input-error" : ""
                }`}
              />
              {errors.username && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* Photo URL Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                {...register("photoURL", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^(http:\/\/|https:\/\/)/,
                    message: "Invalid URL format",
                  },
                })}
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.photoURL.message}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email address",
                  },
                })}
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Input */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      message:
                        "Password must include uppercase, lowercase, number, and special character",
                    },
                  })}
                  className={`input input-bordered w-full pr-12 ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Create Account
            </button>
            <p className="text-center mt-4 text-gray-500">
              Already registered?{" "}
              <Link to="/login" className="text-primary">
                Go to SIGN IN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
