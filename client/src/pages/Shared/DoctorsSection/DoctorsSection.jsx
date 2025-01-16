import React from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { GrLocation } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { MdOutlineMonetizationOn } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#F7A582",
  inactiveFillColor: "#fbf1a9",
};

const DoctorsSection = ({ item }) => {
  const { name, image, title, starRating, location, availableOn, price, id } =
    item;

  const navigate = useNavigate();

  const handleViewProfile = (id) => {
    navigate(`/doctor/${id}`); // Navigate to the doctor's profile page using the ID
  };

  return (
    <div className="p-8 border rounded-lg hover:shadow-lg transition-shadow">
      <img
        className="w-full h-56 object-cover rounded-md"
        src={image}
        alt={title}
      />
      <h4 className="mt-4 text-lg font-semibold text-black">{name}</h4>
      <h3 className=" text-md font-semibold text-gray-400">{title}</h3>
      <p className="text-yellow-500 mt-1 pb-6">
        <Rating
          style={{ maxWidth: 180 }}
          value={starRating}
          readOnly
          itemStyles={myStyles}
        />
      </p>
      <hr className="p-2" />
      <div className="flex gap-2">
        <GrLocation className="text-black text-xl mt-1" />
        <p className="text-gray-500 font-semibold text-xl">{location}</p>
      </div>
      <div className="flex gap-2 my-2">
        <MdDateRange className="text-black text-xl mt-1" />
        <p className="text-md text-gray-400 font-medium mt-0.5">
          Available: {availableOn}
        </p>
      </div>
      <div className="flex gap-2 mb-1">
        <MdOutlineMonetizationOn className="text-black text-xl mt-1" />
        <p className="mb-2 font-bold text-gray-400 mt-0.5">{price}</p>
      </div>
      <button
        className="w-full text-[#F7A582] border border-[#F7A582] hover:bg-[#F7A582] hover:text-white rounded-md p-4 transition-all duration-300 ease-in-out"
        onClick={() => handleViewProfile(id)} // Passing the doctor’s ID to navigate
      >
        View Profile
      </button>
    </div>
  );
};

export default DoctorsSection;
