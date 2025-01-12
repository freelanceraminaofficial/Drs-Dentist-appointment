import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  // State to track the selected menu item
  const [selectedMenu, setSelectedMenu] = useState(null);

  // Menu items
  const menuItems = [
    { id: 1, name: "Home", link: "#" },
    { id: 2, name: "Profile", link: "#" },
    { id: 3, name: "Settings", link: "#" },
    { id: 4, name: "Reports", link: "#" },
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
                onClick={() => handleMenuClick(item.id)}
                className={`mb-2 p-3 rounded cursor-pointer ${
                  selectedMenu === item.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-700 transition-colors"
                }`}
              >
                {item.name}
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
        <div className="text-gray-700">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
