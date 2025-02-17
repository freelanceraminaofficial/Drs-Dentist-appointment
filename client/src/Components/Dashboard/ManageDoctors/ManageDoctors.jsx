import React from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManageDoctors = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: doctors = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/manage-doctors");
        return res.data;
      } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
      }
    },
  });

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return <p className="text-red-500 text-center">Error fetching doctors</p>;
  // }

  // if (doctors.length === 0) {
  //   return <p className="text-center">No doctors found</p>;
  // }

  const handleDeleteDoctor = (doctor) => {
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
        axiosPublic
          .delete(`/add-doctors/${doctor._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The doctor has been successfully deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Failed to delete the doctor.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: "Something went wrong while deleting the doctor.",
              icon: "error",
            });
            console.error("Error deleting doctor:", error);
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Manage Doctors: {doctors.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr key={doctor._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="w-12 rounded-full">
                      <img
                        src={doctor.avatar || "https://via.placeholder.com/150"}
                        alt={doctor.name || "Doctor"}
                      />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDeleteDoctor(doctor)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
