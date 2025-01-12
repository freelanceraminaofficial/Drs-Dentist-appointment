import { FiPhoneOutgoing } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuClock3 } from "react-icons/lu";

const ContactSection = () => {
  const contactInfo = [
    {
      id: 1,
      icon: <LuClock3 className="mr-3 mt-4" />,
      title: "Opening Hours",
      description: "Open 9.00 am to 5.00 pm Everyday",
    },
    {
      id: 2,
      icon: <HiOutlineLocationMarker className="mr-2 mt-4" />,
      title: "Our Locations",
      description: "Dhanmondi 17, Dhaka, 1200, Bangladesh",
    },
    {
      id: 3,
      icon: <FiPhoneOutgoing className="mr-4 mt-5" />,
      title: "Contact Us",
      description: "+88 01750 00 00 00, +88 01750 00 00 00",
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 p-20">
        {contactInfo.map((info) => (
          <div
            key={info.id}
            className="flex items-center justify-center p-14 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-[#F7A582] dark:border-gray-700 dark:hover:border-transparent bg-teal-800"
          >
            <div className="mb-6">
              <span className="text-4xl">{info.icon}</span>
            </div>
            <div className="text-lef mt-2">
              <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
              <p className="text-sm mt-1">{info.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
