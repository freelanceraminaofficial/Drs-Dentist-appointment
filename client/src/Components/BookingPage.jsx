import React, { useState } from "react";
import { useForm } from "react-hook-form";

const BookingPage = () => {
  const [selectedCard, setSelectedCard] = useState(null); // Track selected card
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  const { register, handleSubmit, reset } = useForm(); // React Hook Form setup

  const cards = [
    {
      id: 1,
      name: "Cavity Protection",
      description: "Protect your teeth from cavities with advanced care.",
      price: "$50",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Whitening Teeth",
      description: "Brighten your smile with professional teeth whitening.",
      price: "$80",
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Gum Care",
      description: "Maintain healthy gums with specialized treatments.",
      price: "$60",
      image: "https://via.placeholder.com/300",
    },
  ];

  // Handle card selection
  const handleCardSelection = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    reset(); // Reset the form
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Book Your Service
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="card bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
              onClick={() => handleCardSelection(card)}
            >
              <figure>
                <img
                  src={card.image}
                  alt={card.name}
                  className="rounded-t-lg w-full"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg font-bold">{card.name}</h2>
                <p className="text-gray-600">{card.description}</p>
                <p className="text-blue-500 font-semibold mt-2">{card.price}</p>
                <button
                  className="btn btn-primary mt-4"
                  onClick={() => handleCardSelection(card)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">
              Booking: {selectedCard?.name}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  {...register("email", { required: true })}
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("phone", { required: true })}
                  placeholder="Your Phone Number"
                />
              </div>
              <button className="btn btn-primary w-full" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
