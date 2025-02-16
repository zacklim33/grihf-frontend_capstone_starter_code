import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // import Link component for navigation using react-router-dom
import "./navbar.css"; //import css styles
import "./navbar_responsive.css"; //import responsive css styles


const Navbar = () => {
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const handleClick = () => setClick(!click);

  const handleLogout = () => {
      sessionStorage.removeItem("auth-token");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("phone");

      // remove email phone
      localStorage.removeItem("doctorData");
      setIsLoggedIn(false);
      // setUsername("");
     
      // Remove the reviewFormData from local storage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("reviewFormData_")) {
          localStorage.removeItem(key);
        }
      }
      setEmail('');
      window.location.reload();
  }

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  }

  useEffect(() => { 
    const storedemail = sessionStorage.getItem("email");
    const storedname = sessionStorage.getItem("name");

    if (storedemail) {
          setIsLoggedIn(true);
          setEmail(storedemail);
          setName(storedname);
        }
      }, []);

return (
<nav className="navbar">
  <div className="nav-container">   

  <input type="checkbox" id="menu-toggle"/>
    <label for="menu-toggle" class="hamburger">&#9776;</label>

    <div className="logo">
      <Link to="/"> StayHealth <span className="inc">Inc</span>

        <span className="doctor-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
            <title>Doctor With Stethoscope SVG icon</title>
            <g>
                <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44...."></path>
                </g>
            </g>
        </svg>
        </span>
      </Link>        
    </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/services" >Services</Link></li>
          <li><Link to="/appointments" >Appointments</Link></li>
          <li><Link to="/blog" >Blog</Link></li>
          <li><Link to="/review" >Review</Link></li>
          <li><Link to="/about" >About Us</Link></li>
        </ul>

        {/* Auth Buttons */}
        <div className="nav-buttons">
        { isLoggedIn? (  <> 
        
          <p class="welcomeTxt"> Hi, {name}. &nbsp; </p>
          <span> <button className="login-btn" onClick={handleLogout}> Logout </button> </span>
        
        </> ) : (
          <>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign up</Link>
          </>
        )}
        </div>

  </div>
 </nav>
 
 );
}

export default Navbar;