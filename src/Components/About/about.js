// AboutUs.js
import React from 'react';
import './about.css';
import aboutUsImage from '../../Assets/doctor2.png';  // Adjust the path as necessary

// Import images for the four content sections
import bestTreatmentImage from '../../Assets/medical.png'; // Adjust paths as necessary
import emergencyHelpImage from '../../Assets/emergency-call.png';
import medicalStaffImage from '../../Assets/medical-heart.png';
import qualifiedDoctorImage from '../../Assets/best-doctors.png';

function About() {
  return (
    <div className="aboutus-container">
      <div className="aboutus-content">
        <div className="aboutus-image">
          <img src={aboutUsImage} alt="About Us" className="aboutus-image" />
        </div>
        <div className="aboutus-text">
          <h1 className="aboutus-title">About Us</h1>
          <p className="aboutus-description">
            Welcome to our clinic! We are dedicated to providing the highest quality healthcare services to our community. Our team of experienced professionals is here to ensure that you receive personalized and compassionate care.
          </p>
          <p className="aboutus-description">
            Our clinic offers a range of services, including general check-ups, specialized treatments, and wellness programs. We strive to create a comfortable and welcoming environment where you can feel at ease while receiving the best possible care.
          </p>
          <p className="aboutus-description">
            At our clinic, your health and well-being are our top priorities. We are committed to continuous improvement and innovation to meet the evolving needs of our patients. Thank you for choosing us as your healthcare provider.
          </p>
          <p className="aboutus-description">
            At our clinic, your health and well-being are our top priorities. We are committed to continuous improvement and innovation to meet the evolving needs of our patients. Thank you for choosing us as your healthcare provider.
          </p>
        </div>
      </div>

      <div className="aboutus-services-title">
        <h2>
          Our Services
        </h2>
      <div className="aboutus-services">
        
        <div className="service-item">
          <img src={bestTreatmentImage} alt="Best Treatment" className="service-image" />
          <h2 className="service-title">Best Treatment</h2>
          <p className="service-description">
            We provide top-notch treatment tailored to your needs.
          </p>
        </div>
        <div className="service-item">
          <img src={emergencyHelpImage} alt="Emergency Help" className="service-image" />
          <h2 className="service-title">Emergency Help</h2>
          <p className="service-description">
            Available 24/7 for any emergency situations.
          </p>
        </div>
        <div className="service-item">
          <img src={medicalStaffImage} alt="Medical Staff" className="service-image" />
          <h2 className="service-title">Medical Staff</h2>
          <p className="service-description">
            Our experienced medical staff is here to assist you.
          </p>
        </div>
        <div className="service-item">
          <img src={qualifiedDoctorImage} alt="Qualified Doctor" className="service-image" />
          <h2 className="service-title">Qualified Doctor</h2>
          <p className="service-description">
            Highly qualified doctors ready to provide expert care.
          </p>
        </div>
      </div>

      <div className="aboutus-team-title">
        <h2>
          Our Team
        </h2>
      <div className="aboutus-team">
        
        <div className="team-item">
          <img src={aboutUsImage} alt="Best Treatment" className="team-image" />
          <h2 className="team-title">Dr. Maria</h2>
          <p className="team-description">
            10 years of professionals experience
          </p>
        </div>
        <div className="team-item">
          <img src={aboutUsImage} alt="Best Treatment" className="team-image" />
          <h2 className="team-title">Dr. Sofie</h2>
          <p className="team-description">
          12 years of professionals experience
          </p>
        </div>
        <div className="team-item">
          <img src={aboutUsImage} alt="Best Treatment" className="team-image" />
          <h2 className="team-title">Dr. Maria</h2>
          <p className="team-description">
          15 years of professionals experience
          </p>
        </div>
        </div>
        
      </div>
      </div>
      

      
    </div>
  );
}

export default About;