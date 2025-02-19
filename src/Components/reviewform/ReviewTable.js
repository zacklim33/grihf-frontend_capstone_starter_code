import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import './ReviewTable.css';
import GiveReviews from './GiveReviews';


//decoy doctor data - to be replaced with an approriate API endpoint
const doctors = [
  { id: 1, name: 'Dr. Zela Lee', specialty: 'General Physician' },
  { id: 2, name: 'Dr. Williams Huang', specialty: 'Dentist' },
  { id: 3, name: 'Dr. Smith Johnson', specialty: 'Cardiology' },
  { id: 4, name: 'Dr. Lena Chow', specialty: 'Dermatology' },
  { id: 5, name: 'Dr. Apu Ali', specialty: 'Homeopath' }
];


const ReviewTable = () => {
  //set initial states 
  const [reviewData, setReviewData] = useState({}); //empty data object passed onto feedback modal
  const [completedReview, setCompletedReview] = useState({}); // Track completed reviews
  const [chosenDoctor, setChosenDoctor] = useState(null); // Track which doctor is selected; doctor's ID
  const [showForm, setShowForm] = useState(false); // Add state to control form visibility

  //prop to be passed onto GiveReviews component
  const handleGiveReview = (serialNumber) => {
    setChosenDoctor(serialNumber);
    setCompletedReview( prevState => ({
      ...prevState,
      id: serialNumber, 
      ratings:0,
      review:"",
    }));

    setReviewData((prevReviewData) => ({ ...prevReviewData, [serialNumber]: ''}));
    };

  //
  const handleReviewSubmit = (serialNumber, formData) => {
        setReviewData((prevReviewData) => ({ ...prevReviewData, [serialNumber]: formData }));
        setCompletedReview( (prev) => ({
          ...prev,
          [serialNumber]: {
            ratings:formData.rating,
            review: formData.review,
          }
        }) )
   };



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
          { !completedReview[doctor.id] ? (
          <Popup contentStyle={{ width: '33%', height: 'auto', borderRadius:"0.5rem" }} trigger={ 
            <button className="review-btn"
              onClick={() => handleGiveReview(doctor.id)} 
              disabled = {completedReview[doctor.id] && completedReview[doctor.id].ratings >0 
                           && completedReview[doctor.id].remarks.length >0 }
              >
                Give Review </button>
              }  modal nested
            >

            {(close) => (  
                  <div className="feedback-modal">
                    <GiveReviews
                        serialNumber={doctor.id}
                        onReviewSubmit={(serialNumber, formData) => {
                          handleReviewSubmit(serialNumber, formData);
                          close(); // Close the modal after submission
                        }}
                        review={reviewData[doctor.id]} // Pass the review data
                        onSubmit={close}
                    />
                    <button className="close-btn" onClick={close}>
                      Close </button>
                  </div>
                  )}
            </Popup>
              ):( 
              <button className="review-btn" disabled> Give review </button>
              )
          }
        </td>
        <td> {completedReview[doctor.id] && (
            <div>
              Rating: {completedReview[doctor.id].ratings}/5 <br />
              "{completedReview[doctor.id].review}"
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

export default ReviewTable;