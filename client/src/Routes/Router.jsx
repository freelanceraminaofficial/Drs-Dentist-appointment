import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Appointment from "../pages/Appointment/Appointment";
import Dashboard from "../Layout/Dashboard";
import Appointments from "../Components/Dashboard/AppointmentsTable/Appointments";
import DoctorProfile from "../Components/DoctorProfile/DoctorProfile";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoutes from "../providers/PrivateRoute";

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
      {
        path: "/doctor/:id",
        element: (
          <PrivateRoutes>
            <DoctorProfile></DoctorProfile>
          </PrivateRoutes>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
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
