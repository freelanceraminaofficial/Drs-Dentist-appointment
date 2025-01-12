import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Appointment from "../pages/Appointment/Appointment";
import Dashboard from "../Layout/Dashboard";
import Appointments from "../Components/Dashboard/AppointmentsTable/Appointments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "appointment",
        element: <Appointment></Appointment>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "appointmenttable",
        element: <Appointments></Appointments>,
      },
    ],
  },
]);
