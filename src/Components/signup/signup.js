import React, {useEffect, useState} from "react"; //Import React library for UI components
import { Link, useNavigate } from "react-router-dom"; // import Link component for navigation using react-router-dom

import "./styles-signup.css"
import "./styles-signup_responsive.css"
import { API_URL} from "../../config"


const Signup = () => {

    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('patient'); // use default value
    const [referred, setReferred] = useState('no'); //use default value
    const [showerr, setShowerr] = useState({}); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {

        e.preventDefault(); // Prevent default form submission        

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
                role: role,
                referred: referred,
            }),
        });

        const json = await response.json(); // Parse the response JSON
        
        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("role", role);
            sessionStorage.setItem("referred", referred);

            alert(email + " " + password + " " + name + " has been registered." );
            
            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page

        } else {
            setShowerr({}); //clear previous session error

            alert("entered signup error");

            if (json.errors) {

                /*const jsonString = JSON.stringify(json.errors);
                alert("sign Json errors:" + jsonString); */

                const newErrors = {};

                for (const err of json.errors) {                
                    newErrors[err.param] = err.msg 
                }

                setShowerr(newErrors); // Show error messages

            } else {  //json.error object is being set

                /*const jsonString = JSON.stringify(json.error);
                alert("single Json error:" + jsonString); 
                */

                //setting
                const newErrors = {};
                json.error.forEach(err => { 
                    newErrors[err.param] = err.msg 
                    alert(err.param + " " + err.msg);
                 });

                setShowerr(newErrors);
                
            }
        }
    };


return (

<section className="hero-section">
<div className="signup-container">
    <div className="signup-header">
        <h1>Sign-up</h1> 
        <span> Are you an existing user? <Link to="/login">Login here.</Link> </span>
    </div>

    <form method="post" onSubmit={register}>  
        <div className="form-group">
            <div className="column">
                <label htmlfor="role">Role:</label><br/>
                <select value={role} onChange={(e) => setRole(e.target.value)}
                  id="role" name="role" required>
                    <option value="doctor">Doctor</option>
                    <option value="patient" selected>Patient</option>
                    <option value="staff">Staff</option>
                </select><br/><br/>
    
                <label htmlfor="referred" >Referred:</label><br/>
                <select value={referred} onChange={(e) => setReferred(e.target.value)}
                  id="referred" name="referred" required>
                    <option value="yes">Yes</option>
                    <option value="no" selected>No</option>
                </select>
            </div>
    
            <div className="column">
                    <label htmlfor="name">Name:</label><br/>
                    <input value={name} onChange={(e)=> setName(e.target.value)}
                      type="text" id="name" name="name" placeholder="Enter your name" /><br/><br/>
                    {showerr.name && <div className="err" >{showerr.name} </div> }  
                   

                    <label htmlfor="email">Email:</label><br/>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                      type="email" id="email" name="email" 
                      placeholder="Enter your personal email" /><br/><br/>
                    {showerr.email && <div className="err" >{showerr.email} </div> }  

                    <label htmlfor="phone">Phone Number</label><br/>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)}
                      type="tel" id="phone" name="phone" placeholder="Enter your local phone number" /><br/><br/>
                    {showerr.phone && <div className="err" >{showerr.phone} </div> }  

                    <label htmlfor="password">Password</label><br/>
                    <input value={password} onChange={ (e)=> setPassword(e.target.value)}
                      type="password" id="password" name="password" placeholder="Enter your password for this account"/><br/><br/>
                    {showerr.password && <div className="err" >{showerr.password} </div> }  
            </div>
        </div>

        <div className="buttons">
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
        </div>
    </form>

</div>

</section>
  ); 
}


export default Signup