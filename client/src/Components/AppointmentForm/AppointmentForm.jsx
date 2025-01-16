import React, { useReducer } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyCalendar from "../DateSelection/MyCalendar";
import BookingModal from "../Modal/BookingModal";
import Swal from "sweetalert2";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await axiosSecure.post("/appointments", formData);
      return response.data;
    },
    onMutate: () => {
      dispatch({ type: "SET_LOADING", payload: true });
    },
    onSuccess: () => {
      dispatch({ type: "SET_LOADING", payload: false });

      // Using Swal with specified options
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Appointment booked successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Perform additional actions after the success notification
      dispatch({ type: "CLOSE_MODAL" });
      dispatch({ type: "RESET_DATE" });
      reset();
    },

    onError: (error) => {
      dispatch({ type: "SET_LOADING", payload: false });
      console.error("Error during mutation:", error);
      alert(error.response?.data?.message || "Failed to submit data");
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
        />
      )}
    </div>
  );
};

export default AppointmentForm;
