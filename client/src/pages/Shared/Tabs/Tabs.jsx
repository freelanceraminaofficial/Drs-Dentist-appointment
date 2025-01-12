import React, { useState } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState("Cavity Protection");
  const [detailsVisible, setDetailsVisible] = useState(false);

  const tabs = [
    {
      name: "Cavity Protection",
      img: "https://i.ibb.co/bPBLm8b/Rectangle-10.png",
      details:
        "Cavity protection helps prevent tooth decay by using fluoride treatments and proper oral hygiene practices. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquenec eros ut ligula malesuada dapibus.",
    },
    {
      name: "Cosmetic Dentistry",
      img: "https://via.placeholder.com/300x200",
      details:
        "Cosmetic dentistry focuses on improving the appearance of your smile through procedures like teeth whitening and veneers. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquenec eros ut ligula malesuada dapibus.",
    },
    {
      name: "Oral Surgery",
      img: "https://via.placeholder.com/300x200",
      details:
        "Oral surgery addresses issues like wisdom tooth extraction and corrective jaw surgery. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisquenec eros ut ligula malesuada dapibus",
    },
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setDetailsVisible(false); // Hide details when switching tabs
  };

  const handleMoreDetailsClick = () => {
    setDetailsVisible(!detailsVisible); // Toggle visibility of details
  };

  const activeTabData = tabs.find((tab) => tab.name === activeTab);

  return (
    <div className="container mx-auto p-4 ">
      {/* Tab Buttons */}
      <div className="flex ml-4 mb-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.name}
            className={`px-4 py-4 border ${
              activeTab === tab.name
                ? "bg-[#F7A582] text-white border-[#F7A582] transition-all duration-500 ease-in-out"
                : "bg-gray-200 text-gray-800"
            } ${
              index === 0
                ? "rounded-l-md"
                : index === tabs.length - 1
                ? "rounded-r-md"
                : "-ml-px"
            }`}
            onClick={() => handleTabClick(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 ">
        {activeTabData && (
          <div>
            <img
              src={activeTabData.img}
              alt={activeTab}
              className="rounded-lg mb-4 w-full h-auto"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              {activeTab}
            </h3>

            <p className="text-gray-600 mt-2">
              {/* Show limited or full text based on "readMore" state */}
              {detailsVisible
                ? activeTabData.details
                : `${activeTabData.details.substring(0, 100)}...`}
            </p>
            <button
              className="px-6 py-2 mt-4 bg-[#F7A582] text-white rounded-lg shadow-md hover:bg-[#e38962]"
              onClick={handleMoreDetailsClick}
            >
              {detailsVisible ? "Show Less" : "More Details"}
            </button>
            {/* More Details Button */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;
