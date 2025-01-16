import React from "react";

const ReviewsTab = ({ doctor }) => (
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4">Reviews</h3>
    {doctor.reviews.map((review, index) => (
      <div
        key={index}
        className="p-4 mb-4 border rounded-lg bg-gray-50 shadow-sm"
      >
        <p className="text-gray-600 font-semibold">{review.name}</p>
        <p className="text-gray-600">{review.comment}</p>
        <p className="text-gray-500 text-sm">Rating: {review.rating}/5</p>
      </div>
    ))}
  </div>
);

export default ReviewsTab;
