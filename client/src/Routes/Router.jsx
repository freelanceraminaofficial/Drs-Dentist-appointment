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
import AllUsers from "../pages/AllUsers.jsx/AllUsers";
import AddDoctorForm from "../Components/Dashboard/AddDoctorForm/AddDoctorForm";
import ManageDoctors from "../Components/Dashboard/ManageDoctors/ManageDoctors";
import AdminRoute from "../providers/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "appointment",
        element: <Appointment />,
      },
      {
        path: "/doctor/:id",
        element: (
          <PrivateRoutes>
            <DoctorProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard/appointments",
        element: <Appointments />,
      },
      {
        path: "/dashboard/users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-doctor",
        element: (
          <AdminRoute>
            <AddDoctorForm />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-doctors",
        element: (
          <AdminRoute>
            <ManageDoctors />
          </AdminRoute>
        ),
      },
    ],
  },
]);
