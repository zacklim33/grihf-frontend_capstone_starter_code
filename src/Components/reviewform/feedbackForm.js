// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';

// Function component for giving reviews
function GiveReviews({serialNumber, onReviewSubmit, review}) {

  //serialNumber = doctorID, from Review component
  //onReviewSubmit = {handleReviewSubmit} function from Review component
  //review prop =  an array of all individual doctor's review

  // State variables using useState hook
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });


  useEffect(() => {
    const storedFormData = localStorage.getItem(`reviewFormData_${serialNumber}`);
    if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
        setSubmitted(true);
      }
    }, [serialNumber]);

  useEffect(() => {
      setFormData((prevFormData) => ({
          ...prevFormData, review: review || prevFormData.review
      }));
    }, [review]);


  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };


  // Update the form data based on user input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if all required fields are filled before submission
    if (formData.name && formData.review && formData.rating > 0) {
      setSubmittedMessage(formData);
      localStorage.setItem(`reviewFormData`, JSON.stringify(formData));
      
      //pass review data to parent component
      onReviewSubmit(serialNumber, formData.review);

      setShowWarning(false);

    } else {      
      setShowWarning(true);
    }

    //reset form data
    setFormData({ name: '',review: '', rating: 0 });

  };

  const renderStar = (rating) => {
    const starClasses = `star ${formData.rating >= rating ? 'filled' : ''} ${formData.rating === rating ? 'clicked' : ''}`;  
    return (  <span key={rating} className={starClasses} 
              onClick={() => handleRatingChange(rating)} >
                ⭐️
              </span>
      );
  };

  
  if (submitted) {
    return (
        <div className="review-box">
            <h2>Your Review has been Recorded!</h2>
            <p> <strong>Name:</strong> {formData.name} </p>
            <p> <strong>Review:</strong> {formData.review} </p>
            <p> <strong>Rating:</strong> {Array(formData.rating).fill('⭐️').join('')} </p>
            <br/>
        </div>
     );
  };

//rendered as a modal window for user to enter their feedback
  return (

      <div className="feedback-modal">
        <form onSubmit={handleSubmit}>
          <h1>Give Your Feedback</h1> <br/>
          {/* Display warning message if not all fields are filled */}
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div> <br/>
          <div>
            <label htmlFor="review">Review:</label>
            <textarea id="review" name="review" value={formData.review} onChange={handleChange}> </textarea>
          </div> <br/>

          {/* rating & submit button to be aligned together */}
          <div>
            <table> <tr> 
              <td> <label htmlfor="rating">Rating: 
                 <span> {[1,2,3,4,5].map((rating) => renderStar(rating))} &nbsp;</span>             
              </label> </td>
              <td> 
                <button style={{justifyContent:"flex-end"}}type="submit">Submit</button>
              </td>
            </tr> </table>
          </div> <br/>

        </form>
      </div>

  );
}
export default GiveReviews;