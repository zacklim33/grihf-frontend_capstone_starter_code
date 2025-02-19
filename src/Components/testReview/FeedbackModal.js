import React, { useState } from 'react';
import StarRating from 'react-star-ratings'; // You'll need to install this: npm install react-star-ratings


const FeedbackModal = ({ doctor, onClose, onSubmit }) => {
  const [rating, setRating] = useState(doctor.rating || 0);
  const [remarks, setRemarks] = useState(doctor.remarks || '');

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    const updatedDoctor = { ...doctor, rating, remarks };
    onSubmit(updatedDoctor);
    onClose();
  };

  return (
    <div className="modal"> {/* Basic modal styling */}
      <div className="modal-content">
        <h2>Feedback for {doctor.name}</h2>
        <StarRating
          rating={rating}
          starRatedColor="#50C878"
          numberOfStars={5}
          starDimension="20px"
          starSpacing="2px"
          changeRating={handleRatingChange}
        />
        <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};


export default FeedbackModal;
