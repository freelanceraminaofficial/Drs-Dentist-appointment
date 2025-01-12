import React from "react";

const Banner = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-16 py-16 bg-teal-900 min-h-[80vh]">
      <div className="lg:w-1/2">
        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Your Best Medical <br /> Help Center
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Lorem Ipsum is simply dummy text they are printing typesetting has
          been the industry's standard.
        </p>
        <button className="mt-6 px-6 py-2 bg-[#F7A582] text-white rounded-lg shadow-lg hover:bg-[#ef895e]">
          All Service
        </button>
      </div>

      <div className="mr-20">
        <img
          src="src/assets/Group 34991.png"
          alt="Doctor 1"
          className="rounded-lg shadow-lg transform translate-x-4"
        />
      </div>
    </section>
  );
};

export default Banner;
