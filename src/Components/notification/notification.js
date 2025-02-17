import React, { useState, useEffect, useRef }  from "react";
import "./notification.css";
import Navbar from '../navbar/navbar';

/* To implement a notification window to remind user of the 
   booked/canceled appointment details
*/


const Notification = ({children}) => {

  //state variable to keep track of keeping notification window open
  const [apptWindow, setApptWindow] = useState(true); 

  const [isLoggedIn, setLogin ] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [apptData, setApptData] = useState(''); //data object
  const [doctorName, setDoctorName] = useState(''); //data object
  const [doctorSpeciality, setDoctorSpeciality] = useState(''); //data object
  const [apptDate, setApptDate] = useState(''); //data object
  const [timeSlot, setTimeSlot] = useState(''); //data object
  

const handleApptWindow = (e) => {
    setApptWindow(false);
}



// Do side-effects 
useEffect( ()=> {

  // Get stored data from sessionStorage & localStorage
  const storedEmail = sessionStorage.getItem("email");
  const storedName = sessionStorage.getItem("name");
  const storedPhoneNum= sessionStorage.getItem("phoneNum");

  const storedAppData = JSON.parse(localStorage.getItem("appointments"))[0];
  const storedDoctorName = storedAppData.doctorName;
  const storedDoctorSpeciality = storedAppData.doctorSpeciality;
  const storedTimeSlot = storedAppData.timeSlot;
  const storedApptDate = storedAppData.apptDate; 
  
   //set the relevant state variables
  if( storedEmail) {
    setLogin(true);
    setEmail(storedEmail);
    setName(storedName);
    setPhoneNum(storedPhoneNum);
  }

  setApptData(storedAppData);
  alert("isLoggedIn " + isLoggedIn);

  if(storedAppData) {
    setDoctorName(storedDoctorName);
    setDoctorSpeciality(storedDoctorSpeciality);
    setTimeSlot(storedTimeSlot);
    setApptDate(storedApptDate);
  }

}, []); //empty dependency array for 1 run after initial render


return (
<div>
  {/* Render Child component */}
  {children}

 {/*Render appointment notification if user is login and apptDetail is avaliable*/} 
 { apptWindow && isLoggedIn && apptData && ( <>
  <div className="notification-container">
    <h1> Appointment Details
    <span> <button name="closeAppt" className="close-btn" onClick={handleApptWindow}>X </button>  </span> </h1> 
    <br/>
   
    <div className="apptDetails">
      <h4 class="lbl"> Doctor:  <span class="spanTxt"> &ensp; {doctorName} </span>   </h4>  
      <h4 class="lbl"> Speciality: <span class="spanTxt"> &ensp; {doctorSpeciality} </span> </h4>
      <h4 class="lbl"> Name: <span class="spanTxt"> &ensp; {name} </span></h4>
      <h4 class="lbl"> Phone Number: <span class="spanTxt"> &ensp; {phoneNum}  </span></h4>
      <h4 class="lbl"> Date of Appointment: <span class="spanTxt"> &ensp; {apptDate} </span></h4>
      <h4 class="lbl"> Time Slot: <span class="spanTxt"> &ensp; {timeSlot} </span></h4>
      
    </div>

  </div> </>
  )};

</div> 
 );
}

//Export Notification component for use with other parts of the application
export default Notification;