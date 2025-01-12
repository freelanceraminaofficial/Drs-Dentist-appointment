import React from "react";
import Tabs from "../../Shared/Tabs/Tabs";

const ServiceSection = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center mx-auto bg-white p-8 lg:p-44 rounded-lg">
      {/* Left Image Section */}
      <div className="lg:w-1/2 pl-40">
        <img
          src="src/assets/Rectangle 20078.png" // Replace with your image URL
          alt="Doctor"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* Right Content Section */}
      <div className="lg:w-1/2 w-full px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 lg:ml-8">
          Our Services
        </h2>
        <p className="text-gray-600 mb-6 lg:ml-8">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>

        {/* Tabs */}
        <div className="flex mb-6 text-black">
          <Tabs></Tabs>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
