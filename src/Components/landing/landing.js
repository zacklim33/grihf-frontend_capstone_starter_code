import React from "react"; //Import React library for UI components
import { Link } from "react-router-dom"; // import Link component for navigation using react-router-dom
import "./style-landing.css"; //import css styles
import "./style-landing_responsive.css"; //import responsive css styles

const landing = () => {

console.log("Rendering Landing page");

return (

    <section className="hero-section">  
    <div className="background-layer"> </div>
  
    <div className="flex-hero"> 
        <h1>Your Health</h1>
        <h2>Our Responsibility</h2>
          
      <div className="highlight-box">
        <p className="message">  Your <strong>reliable medical</strong> health services at the remote areas<br/>
          New life-saving initiative from StayHealthy Inc!
        </p>
      </div>
      <br/>
        <a href="#" className="button">Get Started</a>
    </div>
  
   <div className="overlay-gradient"></div>
  </section>  
  

  );
}

export default landing