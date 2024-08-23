import React from 'react';
import './home.css';
import doctor_img from '../../Assets/doctor.png';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="clinic-title">Welcome to Our Clinic</h1>
        <h1 className="clinic-title">We are Caring for Your Health</h1>
        <p className="clinic-description">
          At Our Clinic, we are dedicated to providing comprehensive healthcare services
          tailored to meet your unique needs. Our team of experienced professionals is here
          to ensure you receive the best possible care in a warm and welcoming environment.
        </p>
      </div>
      <div className="home-image">
        <img src={doctor_img} alt="Transparent Image" class="transparent-image" />
      </div>
    </div>
  );
}

export default Home;
