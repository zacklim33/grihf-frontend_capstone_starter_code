import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import './reviewform.css';
import GiveReviews from './GiveReviews';

const Review = () => {

  //set initial states 
  const [reviewData, setReviewData] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState("1"); // Track which doctor's form is open
  const [completedReviews, setCompletedReviews] = useState({}); // Track completed reviews
  const [showForm, setShowForm] = useState(false); // Add state to control form visibility

  //decoy doctor data
  const doctors = [
    { id: 1, name: 'Dr. Zela Lee', specialty: 'General Physician' },
    { id: 2, name: 'Dr. Williams Huang', specialty: 'Dentist' },
    { id: 3, name: 'Dr. Smith Johnson', specialty: 'Cardiology' },
    { id: 4, name: 'Dr. Lena Chow', specialty: 'Dermatology' },
    { id: 5, name: 'Dr. Apu Ali', specialty: 'Homeopath' }
  ];

  //load review from localStorage
  useEffect ( () => {
    
    const storedReviews = {} ; 

    doctors.forEach( doctor => {
      const storedReview = localStorage.getItem(`reviewFormData`);
      if(storedReview) {
         alert("storedReviews:" + storedReview);
         storedReviews[doctor.id] = JSON.parse(storedReview);
       }
    });

    setCompletedReviews(storedReviews);
  }, [] ); 

  //prop to be passed onto GiveReviews component
  const handleGiveReview = (serialNumber) => {
    setReviewData((prevReviewData) => ({ ...prevReviewData, [serialNumber]: ''}));
    };

  //
  const handleReviewSubmit = (serialNumber, review) => {
        setReviewData((prevReviewData) => ({ ...prevReviewData, [serialNumber]: review }));
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
          <Popup contentStyle={{ width: '33%', height: 'auto', borderRadius:"0.5rem" }} trigger={ 
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