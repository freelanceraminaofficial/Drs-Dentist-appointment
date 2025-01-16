import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  // const { signIn } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
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
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // option: 1 for backend just for username and password
  //   app.post('/login', async (req, res) => {
  //   try {
  //     const { identifier, password } = req.body; // Use 'identifier' to accept either email or username
  //     let user;

  //     // Check if the identifier is an email or username
  //     if (identifier.includes('@')) {
  //       user = await userCollection.findOne({ email: identifier });
  //     } else {
  //       user = await userCollection.findOne({ username: identifier });
  //     }

  //     if (user && await bcrypt.compare(password, user.password)) {
  //       // Generate a JWT token
  //       const token = jwt.sign(
  //         { username: user.username, email: user.email },
  //         process.env.ACCESS_TOKEN_SECRET,
  //         { expiresIn: '1hr' }
  //       );

  //       res.json({ message: 'Login successful', token });
  //     } else {
  //       res.status(401).json({ message: 'Invalid credentials' });
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // });
  // option: 2 for backend just for email or username and password
  const onSubmit = async (data) => {
    try {
      const response = await axiosPublic.post("/login", {
        identifier: data.identifier, // This can be email or username
        password: data.password,
      });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });

      // Save token or handle successful login
      console.log("Token:", response.data.token);
      navigate("/"); // Adjust this route as needed
    } catch (error) {
      console.error("Login error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message ||
          "An error occurred. Please try again.",
      });
    }
  };

  // option: 2 for firebase
  // const onSubmit = (data) => {
  //   const { email, password } = data;

  //   signIn(email, password)
  //     .then((result) => {
  //       const user = result.user;
  //       console.log(user);

  //       // Display success message using Swal
  //       Swal.fire({
  //         title: "User Login Successful.",
  //         showClass: {
  //           popup: "animate__animated animate__fadeInDown",
  //         },
  //         hideClass: {
  //           popup: "animate__animated animate__fadeOutUp",
  //         },
  //       });

  //       navigate(form, { replace: true });
  //     })
  //     .catch((error) => {
  //       console.error("Login error:", error);

  //       // Display error notification using Toastify
  //       toast.error("Login failed. Please check your credentials.");
  //     });
  // };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    setDisabled(!validateCaptcha(user_captcha_value));
  };

  return (
    <div className="flex h-screen">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Left Section */}
      <div className="w-1/2 bg-[#07332F] flex items-center justify-center">
        <div className="text-center">
          <img
            src="https://i.ibb.co.com/TcBJTFm/Screenshot-10.png"
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
            {/* Username/Email Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email or Username</span>
              </label>
              <input
                type="text"
                name="identifier"
                placeholder="Enter your email or username"
                {...register("identifier", {
                  required: "Email or Username is required",
                })}
                className={`input input-bordered w-full ${
                  errors.identifier ? "input-error" : ""
                }`}
              />
              {errors.identifier && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.identifier.message}
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
                onBlur={handleValidateCaptcha}
                type="text"
                name="captcha"
                placeholder="Type the captcha above"
                className="input input-bordered"
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
