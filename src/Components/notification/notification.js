import React, { useState, useEffect }  from "react";
import "./notification.css";
import Navbar from '../navbar/navbar';
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation to detect current route

/* To implement a notification window to remind user of the 
   booked/canceled appointment details
*/


const Notification = ({children}) => {

  //state variable to keep track of keeping notification window open
  const [apptWindow, setApptWindow] = useState(false); //false initially, show on new booking 
  const [isLoggedIn, setLogin ] = useState(false);
  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [apptData, setApptData] = useState(''); //data object
  const [doctorName, setDoctorName] = useState(''); //data object
  const [doctorSpeciality, setDoctorSpeciality] = useState(''); //data object
  const [apptDate, setApptDate] = useState(''); //data object
  const [timeSlot, setTimeSlot] = useState(''); //data object
  const [storageVersion, setStorageVersion] = useState(0); // To force re-render

  const location = useLocation(); // Get current route
  const navigate = useNavigate();

  // Check if we're on the /appointments route
  const isAppointmentsPage = location.pathname === "/appointments";

//boolean function to open or close notification container  
const handleApptWindow = (e) => setApptWindow(false);


// to handle if user has login successfully, else reroute to login
useEffect( () => {
  if(isAppointmentsPage) {
   
    const storedName = sessionStorage.getItem("name");
    const storedEmail = sessionStorage.getItem("email");

    //if not successfully login, navigate to /login endpoint
    if (storedName) {
        setName(storedName) ;
        setEmail(storedEmail);
    } else {
        navigate("/login");
     }
   }
   
}, [isAppointmentsPage, navigate]); //dependencies: run when route changes

// function to handle appointment bookings from doctorCardIC component
const loadAppointmentData = () => {

  // Get stored data from sessionStorage & localStorage
  const storedEmail = sessionStorage.getItem("email");
  const storedName = sessionStorage.getItem("name");
  const storedPhoneNum= sessionStorage.getItem("phoneNum");
  const appointmentsData = localStorage.getItem("appointments");

   //set the relevant state variables
  if( storedEmail) {
    setLogin(true);
    setEmail(storedEmail);
    setName(storedName);
    setPhoneNum(storedPhoneNum);
  }

  // to ensure that there is appointmentData before applying JSON.parse()
  if(appointmentsData) {
    const parsedData = JSON.parse(appointmentsData);
    const storedAppData = parsedData && parsedData[0]; // Safe access
    
    if (storedAppData) {
      setApptData(storedAppData);
      setDoctorName(storedAppData.doctorName);
      setDoctorSpeciality(storedAppData.doctorSpeciality);
      setTimeSlot(storedAppData.timeSlot);
      setApptDate(storedAppData.apptDate);
      setApptWindow(true); //show notification when new data is present
    } else {
      setApptData(null);
      setApptWindow(false); //hide notification window if no appointment
    } 

  } else{ //no appointmentData
    setApptData(null);
    setApptWindow(false); //hide notification window if no appointment
  }

}; 


useEffect( () => {
  //Initial loading when component is mounted
   loadAppointmentData();
  
   const handleStorageChange = () => setStorageVersion((prev) => prev + 1);

    //listen for storage changes from DoctorCardIC componenent
   window.addEventListener("storage", handleStorageChange);
   return() => window.removeEventListener("storage",handleStorageChange);
}, [] ); //empty dependency array for 1 run in initial render


// Re-run loadAppointmentData when storageVersion changes
useEffect(() => { 
   loadAppointmentData();
}, [storageVersion]);

//To handle appointment cancellation
const handleCancelAppointment = () => {
  // Confirm cancellation with user
  if (window.confirm("Are you sure you want to cancel this appointment?")) {

    // Get most recent appointments from localStorage
    const appointmentsData = localStorage.getItem("appointments");

    if (appointmentsData) {
      let appointments = JSON.parse(appointmentsData);
      
      // Filter out the current appointment
      // Assuming appointments is an array and we're removing the first one
      // You might need to modify this logic if you have multiple appointments
      // and want to identify them differently (e.g., by ID)
      appointments = appointments.filter((appt, index) => index !== 0);
      
      // Update localStorage
      if (appointments.length > 0) {
        localStorage.setItem("appointments", JSON.stringify(appointments));
      } else {
        localStorage.removeItem("appointments");
      }

      // Clear the state
      setApptData('');
      setDoctorName('');
      setDoctorSpeciality('');
      setApptDate('');
      setTimeSlot('');
      setApptWindow(false);
      
      // Optional: Show confirmation
      loadAppointmentData();
      alert("Appointment has been canceled successfully!");
    }
  }
}

console.log("Rendering Notification.js")

return (
<div>
  {/* Render Child component */}
  {children}

 {/*Render appointment notification if user is login and apptDetail is available*/} 
 { isAppointmentsPage ? (
 <div className="appointments-page" >
 <h1>Your Appointments</h1>
 {isLoggedIn && apptData ? (
   <div className="appointment-details" >
     <h2>Upcoming Appointment</h2><br/>
     <div className="apptDetails">
       <h4 className="lbl"> Doctor: <span className="spanTxt2">   {doctorName} </span></h4>
       <h4 className="lbl"> Speciality: <span className="spanTxt2">   {doctorSpeciality} </span></h4>
       <h4 className="lbl"> Name: <span className="spanTxt2">   {name} </span></h4>
       <h4 className="lbl"> Phone Number: <span className="spanTxt2">   {phoneNum} </span></h4>
       <h4 className="lbl"> Date of Appointment: <span className="spanTxt2">   {apptDate} </span></h4>
       <h4 className="lbl"> Time Slot: <span className="spanTxt2">   {timeSlot} </span></h4>
     </div>
 
     <div className="appt-actions" style={{marginTop: '20px', textAlign: 'center'}}>
        <button className="cancel-btn" onClick={handleCancelAppointment}> Cancel </button>
     </div>
   </div>
   ):(
    <p> No upcoming appointments </p>
   )}
   </div>

):( 
   apptWindow && isLoggedIn && apptData && ( <>
  <div className="notification-container">
    <h2> Appointment Details
    <span> <button name="closeAppt" className="close-btn" onClick={handleApptWindow}>X </button>  </span> </h2> 
    <br/>
   
    <div className="apptDetails">
      <h4 className="lbl"> Doctor:  <span className="spanTxt"> &ensp; {doctorName} </span>   </h4>  
      <h4 className="lbl"> Speciality: <span className="spanTxt"> &ensp; {doctorSpeciality} </span> </h4>
      <h4 className="lbl"> Name: <span className="spanTxt"> &ensp; {name} </span></h4>
      <h4 className="lbl"> Phone Number: <span className="spanTxt"> &ensp; {phoneNum}  </span></h4>
      <h4 className="lbl"> Date of Appointment: <span className="spanTxt"> &ensp; {apptDate} </span></h4>
      <h4 className="lbl"> Time Slot: <span className="spanTxt"> &ensp; {timeSlot} </span></h4>
      
    </div>

    {/*Cancel Button*/}
    <div className="appt-actions" style={{marginTop: '20px', textAlign: 'center'}}>
    <button className="cancel-btn" onClick={handleCancelAppointment}> Cancel </button>
    </div>

  </div> 
    </> )
 ) };

</div> 
 );
}

//Export Notification component for use with other parts of the application
export default Notification;