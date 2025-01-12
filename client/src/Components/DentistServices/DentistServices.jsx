const services = [
  {
    name: "Teeth Orthodontics",
    img: "https://i.ibb.co.com/59VFz2n/Group-34964.png",
    bg: "bg-red-100",
  },
  {
    name: "Cosmetic Dentisty",
    img: "https://i.ibb.co.com/6bNJDKw/Flat.png",
    bg: "bg-yellow-100",
  },
  {
    name: "Teeth Cleaning",
    img: "https://i.ibb.co.com/MNZLHwQ/Group.png",
    bg: "bg-red-100",
  },
  {
    name: "Root Canal Treatment",
    img: "https://i.ibb.co.com/y5th3Dt/Group-1.png",
    bg: "bg-sky-100",
  },
  {
    name: "Pediatric Dental",
    img: "https://i.ibb.co.com/7x3N76n/Group-34967.png",
    bg: "bg-red-100",
  },
  {
    name: "Oral Surgery",
    img: "https://i.ibb.co.com/VjtG3N5/Group-34963.png",
    bg: "bg-yellow-100",
  },
];

export default function DentistServices() {
  return (
    <div>
      <div className="font-medium text-center p-16 text-red-400 text-2xl">
        <p>Available Services on April 30, 2022</p>
        <h1 className="font-bold text-black text-5xl mt-4">
          Please select a service.
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-10 rounded-lg shadow-md flex items-center "
          >
            <div className=" flex  items-center">
              <img
                src={service.img}
                alt=""
                className={`${service.bg} p-6 mr-4 rounded-lg shadow-md`}
              />
              <h3 className="text-xl font-semibold w-1/2 text-left">
                {service.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
