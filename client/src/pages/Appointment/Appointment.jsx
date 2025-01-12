import React, { useReducer } from "react";
// import MyCalendar from "../../Components/DateSelection/MyCalendar";
import DentistServices from "../../Components/DentistServices/DentistServices";
import AppointmentForm from "../../Components/AppointmentForm/AppointmentForm";
// import SelectedCard from "../../Components/SelectedCard";
import BookingPage from "../../Components/BookingPage.jsx";
// import Time from "../../Components/Time";

const initialState = {
  selectedDate: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
};

const Appointment = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-12 bg-teal-900 min-h-[70vh]">
        <div className="lg:w-1/2">
          <p className="text-2xl mb-2 text-white ml-3">Home / Appointment</p>
          <h1 className="text-4xl lg:text-6xl font-bold text-white">
            Appointment
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="flex flex-wrap items-start justify-center gap-20 px-10 lg:px-52 group-container">
        <div className="border shadow-md rounded-lg bg-white mt-5">
          {/* <MyCalendar dispatch={dispatch} /> */}
          <AppointmentForm selectedDate={state.selectedDate} />
        </div>
        <div>
          <img
            src="https://i.ibb.co/RSzwTcF/chair-1.png"
            alt="Chair for Appointment"
            className="rounded-lg shadow-lg mt-10 w-full lg:w-auto"
          />
        </div>
      </div>

      {/* Dentist Services and Form */}
      <div className="px-6 lg:px-44 py-12">
        <DentistServices />
        {/* <Time /> */}
      </div>
      <div>
        <BookingPage></BookingPage>
      </div>
    </div>
  );
};

export default Appointment;
