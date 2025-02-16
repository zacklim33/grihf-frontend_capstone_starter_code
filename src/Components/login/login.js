import React, { useState, useEffect } from 'react'; //Import React library for UI components
import { Link, useNavigate } from "react-router-dom"; // import Link component for navigation using react-router-dom
import "./styles-login.css"; //import css styles
import "./styles-login_responsive.css"; //import responsive css styles
import { API_URL } from '../../config';

const Login = () => {

  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [showerr, setShowerr] = useState({}); // Object to show error messages
  
  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token"))  navigate("/");
  }, []);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();

    setShowerr({}) ; //clear all errors initially
    
    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Parse the response JSON
    const json = await res.json();

    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', json.email);
      sessionStorage.setItem('name', json.name);

      alert("Successful login:" + json.name + " " + json.email);

      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();

    } else {

      // Clear previous errors
      setShowerr({});

      if (json.errors) {
        
        /* const jsonString = JSON.stringify(json.errors);
        alert("some errors:" + jsonString); */

        const newErrors = {};
        json.errors.forEach(error => {
          // Assuming your API returns errors with a 'path' property
          // indicating which field has the error. Adjust if needed.
          if (error.path === 'email' || error.param === 'email') {
            newErrors.email = error.msg;
          } else if (error.path === 'password' || error.param === 'password') {
            newErrors.password = error.msg;
          } else {
            // Handle other errors or generic errors
            newErrors.general = error.msg; // Or display a general alert
          }
        });
        setShowerr(newErrors);

      } else if (json.error) {

        /*
        const jsonString = JSON.stringify(json.errors);
        alert("1x errors:" + jsonString); 
        alert("single error");
        alert(toString(json.error)); */

          setShowerr({ general: json.error }); // General error
      }
    }
  };



return (
<section className="hero-section">

  <div className="signin-container">
  <div className="signin-header">
    <h1> Sign In </h1>
    <span> A new user? <Link to="/signup"> Sign up here</Link> </span>
  </div>
  
  <form onSubmit={login}> 
    <div className="form-group">
      <div className="column">
          <label htmlfor = "email" > Email </label><br/>
          <input value={email} onChange={(e)=> setEmail(e.target.value)}
            type="text" id="email" name="email" placeholder="Enter your email" /> <br/><br/> 
          {showerr.email && <div className="err" >{showerr.email} </div> }

          <label htmlfor ="password" > Password </label><br/>
          <input value={password} onChange={(e)=> setPassword(e.target.value)}
            type="password" id="password" name="password" placeholder="Enter your password"/> <br/><br/>
           {showerr.password && <div className="err"> {showerr.password} </div> }

      </div>
    </div>

      <div className="button-container">
          <button type="submit">Login</button>
          <button type="reset">Reset</button>
      </div>
  </form>


  </div>
</section>


 );
}

export default Login