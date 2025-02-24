import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/navbar/navbar';
import LandingPage from './Components/landing/landing'
import LoginPage from './Components/login/login'
import SignupPage from './Components/signup/signup'
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import Notification from './Components/notification/notification';
import Review from './Components/reviewform/ReviewTable';
import ProfileForm from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {

  console.log("Rendering App");
  
  return (
    <div className="App">
     <BrowserRouter>

     {/* to display the notification component from Module 4*/}
      <Notification>

        {/* display the navbar component*/}
        <Navbar/>

        {/*setup individual route components for different pages */ }
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/review" element={<Review/>} />
          <Route path='/profile' element={<ProfileForm />} />
          <Route path='/reports' element={<ReportsLayout />} />
          <Route path='/appointments' element={null} /> {/* using notification.js to handle */}
        </Routes>

        </Notification>
      </BrowserRouter>
       
    </div>
  );
}
export default App;
