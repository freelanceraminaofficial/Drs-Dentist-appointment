import useAppoint from "../../../hooks/useAppoint";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Appointments = () => {
  const [appointment, refetch] = useAppoint();

  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
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
        axiosSecure.delete(`/appointments/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Appointments:{" "}
        {appointment.length < 10
          ? `0${appointment.length}`
          : appointment.length}
      </h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full border-collapse">
          {/* Table Head */}
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {appointment.map((item, index) => (
              <tr
                key={item._id}
                className="border-b last:border-none hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={item.phoneNumber}
                        alt={item.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">{item.fullName}</td>
                <td className="py-4 px-6">{item.date}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FaTrashAlt size={20} />
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

export default Appointments;
