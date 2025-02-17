import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import MyCalendar from "../DateSelection/MyCalendar";
import BookingModal from "../Modal/BookingModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const initialState = {
  isModalOpen: false,
  selectedDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, selectedDate: action.payload };
    case "OPEN_MODAL":
      return { ...state, isModalOpen: true };
    case "CLOSE_MODAL":
      return { ...state, isModalOpen: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "RESET_DATE":
      return { ...state, selectedDate: "" };
    default:
      return state;
  }
};

const AppointmentForm = () => {
  const axiosSecure = useAxiosSecure();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth(); // Replace with your authentication method
  const userEmail = user?.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (!userEmail) {
        Swal.fire({
          icon: "error",
          title: "Login Required",
          text: "Please log in before booking an appointment.",
        });
        throw new Error("User is not logged in.");
      }

      // Enforce logged-in email for booking
      formData.email = userEmail;

      const response = await axiosSecure.post("/appointments", formData);
      return response.data;
    },
    onSuccess: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Appointment booked successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({ type: "CLOSE_MODAL" });
      dispatch({ type: "RESET_DATE" });
      reset();
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    },
  });

  const onSubmit = (data) => {
    if (!state.selectedDate) {
      alert("Please select a date before booking.");
      return;
    }
    const formData = { ...data, date: state.selectedDate };
    mutation.mutate(formData);
  };

  return (
    <div className="flex flex-col items-center ">
      <MyCalendar selectedDate={state.selectedDate} dispatch={dispatch} />

      <button
        className="bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700"
        onClick={() => dispatch({ type: "OPEN_MODAL" })}
      >
        Book Appointment
      </button>

      {state.isModalOpen && (
        <BookingModal
          state={state}
          dispatch={dispatch}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default AppointmentForm;
