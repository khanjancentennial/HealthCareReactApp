// Footer.js
import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import logo from '../../Assets/kclinicLogo.png';  // Adjust the path as necessary

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Clinic Logo" className="footer-logo-image" />
        </div>
        <div className="footer-middle">
          <div className="footer-contact">
            <h3>Contact</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> <a className="mail-text" href="mailto:contact@clinic.com">contact@clinic.com</a></p>
            <p><FontAwesomeIcon icon={faPhone} /> Phone: (123) 456-7890</p>
            <div className="social-media">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
          <div className="footer-address">
            <h3>Address</h3>
            <p>123 Clinic Street</p>
            <p>City, State, ZIP Code</p>
            <p>Country</p>
          </div>
        </div>
      </div>
      <p className="footer-copyright">&copy; 2024 KClinic. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
