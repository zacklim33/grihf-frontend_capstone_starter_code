import React, { useState, useEffect } from 'react'

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [apptDate, setApptDate] = useState('');
    const [timeSlot, setTimeSlot] = useState('');
    const [email, setEmail] = useState('');

  // Do side-effects to get details
  useEffect( ()=> {
       const storedEmail = sessionStorage.getItem("email");
       const storedName = sessionStorage.getItem("name");
       const storedPhoneNum= sessionStorage.getItem("phoneNum");

    if(storedEmail) {
      setEmail(storedEmail);
      setName(storedName);
      setPhoneNum(storedPhoneNum);
    }

  }, []); //empty dependency array for 1 run after initial render

    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() + 1); // Add 1 year
    const maxDateString = maxDate.toISOString().split('T')[0];

    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNum, apptDate, timeSlot });
      setName('');
      setPhoneNum('');
      setApptDate('');
      setTimeSlot('');
    };
  
    const onTimeSlotChange= (e) => {
      setTimeSlot(e.target.value);
    }

    const onApptDateChange = (inDate) => {
      setApptDate(inDate.target.value);
    }

  return (
      <form onSubmit={handleFormSubmit} className="appointment-form" >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name}
            onChange={(e) => setName(e.target.value)}
            required />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNum">Phone Number:</label>
          <input type="tel" id="phoneNum" value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            required />
        </div>

      <div className="form-group">
        <label htmlfor="apptDate">Appointment Date </label>
        <input type="date" id="apptDate" name="apptDate" value={apptDate} 
          min={today} max={maxDateString} onChange={onApptDateChange} 
        required/>
      </div>

      <div className="form-group">
        <label htmlfor="timeSlot"> Time Slot</label>        
        <select id="timeSlot" name="timeSlot" value={timeSlot} required onChange={onTimeSlotChange}>
          <option value=""> Select a time slot </option>
          <option value="09:00-10:00"> 09:00-10:00</option>
          <option value="10:00-11:00"> 10:00-11:00</option>
          <option value="11:00-12:00"> 11:00-12:00</option>
          <option value="14:00-15:00"> 14:00-15:00</option>
          <option value="15:00-16:00"> 15:00-16:00</option>
          <option value="16:00-17:00"> 16:00-17:00</option>
        </select>
      </div>
      <br/> &emsp; &emsp;  &emsp; &emsp; &emsp;

        <button type="submit">Book Now</button>

      </form>
    );
  };

export default AppointmentFormIC
