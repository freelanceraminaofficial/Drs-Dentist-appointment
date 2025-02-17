import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddDoctorForm = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Validate if a photo is uploaded
      if (
        !data.name ||
        !data.specialty ||
        !data.photo ||
        data.photo.length === 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "All fields are required, including a photo!",
        });
        return;
      }

      // Prepare the image file for upload
      const imageFile = new FormData();
      imageFile.append("image", data.photo[0]);

      // Upload the image to the hosting service
      const res = await axiosPublic.post(image_hosting_url, imageFile);
      if (!res.data.success) {
        throw new Error("Image upload failed");
      }

      // Prepare doctor data for the backend
      const doctorItem = {
        name: data.name,
        avatar: res.data.data.display_url,
        specialty: data.specialty,
      };

      // Send doctor data to the backend
      const doctorRes = await axiosPublic.post("/manage-doctors", doctorItem);
      if (doctorRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} has been added successfully.`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Failed to save doctor data");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 p-8">
      <div className="bg-white p-10 rounded-lg shadow-xl w-[40rem]">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Add a New Doctor
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className="input input-bordered w-full text-lg"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className="input input-bordered w-full text-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Specialty */}
          <div>
            <label className="block text-lg font-medium mb-2">Specialty</label>
            <select
              {...register("specialty", { required: "Specialty is required" })}
              className="select select-bordered w-full text-lg"
            >
              <option value="">Select Specialty</option>
              <option value="Teeth Orthodontics">Teeth Orthodontics</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
            {errors.specialty && (
              <p className="text-red-500 text-sm mt-2">
                {errors.specialty.message}
              </p>
            )}
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Upload Your Photo
            </label>
            <div className="border-dashed border-2 border-gray-300 p-6 rounded-md">
              <input
                type="file"
                {...register("photo", { required: "Photo is required" })}
                className="file-input file-input-bordered w-full"
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.photo.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-teal-800 text-white hover:bg-teal-600 w-full text-lg py-3"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;
