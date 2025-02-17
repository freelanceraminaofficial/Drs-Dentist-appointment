import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import CustomCalendar from "../Components/CustomCalendar/CustomCalendar";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin(); // Ensure admin status loads correctly

  if (isAdminLoading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  // Define menu items for admin and regular users
  const adminMenu = [
    { id: 5, name: "All Users", link: "/dashboard/users" },
    { id: 6, name: "Add Doctors", link: "/dashboard/add-doctor" },
    { id: 7, name: "Manage Doctors", link: "/dashboard/manage-doctors" },
    { id: 4, name: "Home", link: "/" },
  ];

  const userMenu = [
    { id: 1, name: "My Appointments", link: "/dashboard/appointments" },
    { id: 3, name: "My History", link: "/dashboard/history" },
    { id: 2, name: "My Reviews", link: "/dashboard/reviews" },
    { id: 4, name: "Home", link: "/" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>

        <nav className="flex-1 p-4">
          <ul>
            {(isAdmin ? adminMenu : userMenu).map((item) => (
              <li key={item.id} className="mb-2">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `block p-3 rounded transition-colors ${
                      isActive ? "bg-gray-700" : "hover:bg-gray-700"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <footer className="p-4 border-t border-gray-700">
          <p className="text-sm">© 2025 Dashboard</p>
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Welcome to the Dashboard
        </h2>
        <CustomCalendar />
        <div className="text-gray-700">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
