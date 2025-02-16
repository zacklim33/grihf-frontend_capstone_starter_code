import React from "react"; //Import React library for UI components
import { Link } from "react-router-dom"; // import Link component for navigation using react-router-dom
import "./style-landing.css"; //import css styles
import "./style-landing_responsive.css"; //import responsive css styles

const landing = () => {

return (

    <section class="hero-section">  
    <div class="background-layer"> </div>
  
    <div class="flex-hero"> 
        <h1>Your Health</h1>
        <h2>Our Responsibility</h2>
          
      <div class="highlight-box">
        <p class="message">  Your <strong>reliable medical</strong> health services at the remote areas<br/>
          New life-saving initiative from StayHealthy Inc!
        </p>
      </div>
      <br/>
        <a href="#" class="button">Get Started</a>
    </div>
  
   <div class="overlay-gradient"></div>
  </section>  
  

  );
}

export default landing