import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/navbar/navbar';
import LandingPage from './Components/landing/landing'
import LoginPage from './Components/login/login'
import SignupPage from './Components/signup/signup'


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        {/* display the navbar component*/}
        <Navbar/>

        {/*setup individual route components for different pages */ }
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
        </Routes>
            
      </BrowserRouter>
       
    </div>
  );
}
export default App;
