import React, { useState } from 'react';
import StarRating from 'react-star-ratings'; // You'll need to install this: npm install react-star-ratings
import FeedbackModal from './FeedbackModal'
import './DoctorTable.css'

// Sample Doctor Data (replace with your actual data fetching)
const initialDoctors = [
  { id: 1, name: 'Dr. Smith', rating: 0, remarks: '' },
  { id: 2, name: 'Dr. Jones', rating: 0, remarks: '' },
  { id: 3, name: 'Dr. Lee', rating: 0, remarks: '' },
];

// Doctor Table Component
const DoctorTable = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleReviewClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleFeedbackSubmit = (updatedDoctor) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === updatedDoctor.id ? updatedDoctor : doctor
    );
    setDoctors(updatedDoctors);
    setShowModal(false);
    setSelectedDoctor(null); // Clear selected doctor
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>
                <StarRating
                  rating={doctor.rating}
                  starRatedColor="#50C878"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  // You might want to disable rating display only, if you don't want to change it here.
                  // However, it is better to change it in the backend.
                  // isSelectable={false}
                />
              </td>
              <td>{doctor.remarks}</td>
              <td>
                <button className="review-btn"
                  onClick={() => handleReviewClick(doctor)}
                  disabled = {doctor.rating > 0 && doctor.remarks.length > 0}
                >
                  Give Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedDoctor && (
        <FeedbackModal
          doctor={selectedDoctor}
          onClose={() => setShowModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  );
};

export default DoctorTable 