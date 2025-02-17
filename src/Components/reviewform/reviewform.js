import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import './reviewform.css';
import GiveReviews from './feedbackForm';

const Review = () => {

 const [reviewData, setReviewData] = useState({});

 // Track which doctor's form is open
 const [selectedDoctor, setSelectedDoctor] = useState("1");
 // Track completed reviews
 const [completedReviews, setCompletedReviews] = useState({});
 
// Add state to control form visibility
const [showForm, setShowForm] = useState(false);

 //decoy doctor data
 const doctors = [
    { id: 1, name: 'Dr. Zela Lee', specialty: 'General Physician' },
    { id: 2, name: 'Dr. Williams Huang', specialty: 'Dentist' },
    { id: 3, name: 'Dr. Smith Johnson', specialty: 'Cardiology' }
  ];

  const handleReviewClick = (doctorId) => {
    setSelectedDoctor(doctorId);
    setShowForm(true);  // Show the form when button is clicked
  };

  const handleReviewComplete = (review) => {
    setCompletedReviews(prev => ({
      ...prev,
      [selectedDoctor]: review
    }));
    setSelectedDoctor(null);
    setShowForm(false);  // Hide the form after submission
  };

  const handleFormClose = () => {
    setSelectedDoctor(null);
    setShowForm(false);  // Hide the form when closed
  };
  

  const handleGiveReview = (serialNumber) => {
    setReviewData((prevReviewData) => ({
        ...prevReviewData,
        [serialNumber]: ''
      }));
    };

  const handleReviewSubmit = (serialNumber, review) => {
        setReviewData((prevReviewData) => ({
            ...prevReviewData,
            [serialNumber]: review
        }));
  };

  const navigate = useNavigate();

return ( 
<>
  <div className="reviews-container">
  <h1> Reviews <br/></h1> 

  <table className="review-table">
    <thead> <tr>
      <th>S/No.</th>
      <th>Doctor name</th>
      <th>Doctor specialty</th>
      <th>Provide review</th>
      <th>Review given</th>
    </tr></thead>

    <tbody>
    {doctors.map(doctor => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.specialty}</td>
                <td>  
                {!reviewData[doctor.id] ? (
                  <Popup trigger={ 
                    <button className="review-btn"
                      onClick={() => handleGiveReview(doctor.id)} >
                        Give Review </button>
                     }  modal nested
                   >

                    {(close) => ( 
                      <div className="feedback-modal">
                        <GiveReviews
                            serialNumber={doctor.id}
                            onReviewSubmit={handleReviewSubmit}
                            review={reviewData[doctor.id]} // Pass the review data
                        />
                        <button className="close-btn" onClick={close}>
                          Close </button>
                      </div>
                     )}

                    </Popup>
                        ) : (
                        <button className="review-btn" disabled>
                            Give Review
                        </button>
                        )
                }
                </td>
                <td> {completedReviews[doctor.id] && (
                    <div>
                      Rating: {completedReviews[doctor.id].rating}/5 <br />
                      "{completedReviews[doctor.id].review}"
                    </div>
                  )}
                </td>
              </tr>
            ))}
    </tbody>
  </table>

 </div> 
 </> 
 
);
}

export default Review;