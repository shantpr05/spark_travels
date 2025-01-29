import React from 'react';
import './Footer.css'; 

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h2 className="footer-logo">LankaStay.</h2>
        <p>We kaboom your beauty holiday instantly and memorable.</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-linkedin-in"></i></a>
          <a href="#"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Copyright © 2025</p>
        <p><a href="#">Terms and Conditions</a> | <a href="#">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default FooterComponent;
