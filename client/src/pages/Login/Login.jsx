import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const formPath = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    const { email, password, captcha } = data;

    if (!validateCaptcha(captcha)) {
      toast.error("Captcha validation failed. Please try again.");
      return;
    }

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        navigate(formPath, { replace: true });
      })
      .catch((error) => {
        console.error("Login error:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    setDisabled(!validateCaptcha(user_captcha_value));
    setValue("captcha", user_captcha_value);
  };

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Left Section */}
      <div className="w-1/2 bg-[#07332F] flex items-center justify-center">
        <div className="text-center">
          <img
            src="https://i.ibb.co/TcBJTFm/Screenshot-10.png"
            alt="Doctor Illustration"
            className="w-full mx-auto"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Login to Doc House
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
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

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`input input-bordered w-full pr-12 ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
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

            {/* Captcha Validation */}
            <div className="form-control">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                placeholder="Type the captcha above"
                className="input input-bordered"
                onBlur={handleValidateCaptcha}
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <input
                disabled={disabled}
                className="btn btn-primary"
                type="submit"
                value="Login"
              />
            </div>
          </form>

          <p className="text-center mt-4">
            Please register at first.{" "}
            <Link to="/signup" className="text-primary">
              Go to SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
