import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import CustomCalendar from "../Components/CustomCalendar/CustomCalendar";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  // State to track the selected menu item
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isAdmin] = useAdmin();
  // Menu items
  const menuItems = isAdmin
    ? [
        { id: 5, name: "All Users", link: "/admin/users" }, // Admin route
        { id: 6, name: "Add Doctors", link: "/admin/add-doctor" }, // Admin route
        { id: 7, name: "Manage Doctors", link: "/admin/manage-doctors" }, // Admin route
        { id: 4, name: "Home", link: "/" },
      ]
    : [
        { id: 1, name: "My Appointments", link: "/dashboard" },
        { id: 3, name: "My History", link: "/history" },
        { id: 2, name: "My Reviews", link: "/reviews" },
        { id: 4, name: "Home", link: "/" },
      ];

  // Handle menu item click
  const handleMenuClick = (id) => {
    setSelectedMenu(id);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`mb-2 p-3 rounded cursor-pointer ${
                  selectedMenu === item.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-700 transition-colors"
                }`}
              >
                {/* Use React Router's Link for navigation */}
                <Link
                  to={item.link}
                  onClick={() => handleMenuClick(item.id)}
                  className="block"
                >
                  {item.name}
                </Link>
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
        <CustomCalendar></CustomCalendar>

        <div className="text-gray-700">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
