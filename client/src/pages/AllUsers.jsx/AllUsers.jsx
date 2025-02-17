import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Number of users per page

  const toggleDropdown = (userId) => {
    setOpenDropdown((prev) => (prev === userId ? null : userId));
  };

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUpdateRole = (user, role) => {
    axiosSecure.patch(`/users/role/${user._id}`, { role }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is now a ${role}!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been removed.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // **Filtering users based on search input**
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // **Pagination logic**
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // **Pagination Controls**
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      {/* Header & Search */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">All Users</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <h2 className="text-2xl font-medium text-gray-600">
          Total Users:{" "}
          <span className="text-teal-800">{filteredUsers.length}</span>
        </h2>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 border-b transition duration-200"
              >
                <td className="py-4 px-6">{indexOfFirstUser + index + 1}</td>
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(user._id)}
                      className="btn btn-sm bg-orange-500 text-white"
                    >
                      {user.role
                        ? user.role === "admin"
                          ? "Admin"
                          : "Doctor"
                        : "Set Role"}
                    </button>

                    {openDropdown === user._id && (
                      <ul className="absolute left-0 mt-1 menu shadow bg-white rounded-box w-36 p-2 z-10">
                        <li>
                          <button
                            onClick={() => {
                              handleUpdateRole(user, "admin");
                              setOpenDropdown(null);
                            }}
                            className="btn btn-sm w-full"
                          >
                            Admin
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              handleUpdateRole(user, "doctor");
                              setOpenDropdown(null);
                            }}
                            className="btn btn-sm w-full"
                          >
                            Doctor
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg text-red-600 hover:bg-red-50"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 border rounded-md ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 mx-1 border rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 border rounded-md ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
