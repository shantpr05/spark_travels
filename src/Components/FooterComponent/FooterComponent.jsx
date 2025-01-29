import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "./FooterComponent.css";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo">
          {" "}
          <img src="/assets/logo.png" alt="Logo" width="150" height="auto" />
        </div>
        <p>We will take care of your beautiful holiday <br /> instantly and memorably.</p>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
          <FaYoutube />
        </div>
      </div>

      <div className="footer-right">
        <p>Copyright © 2025</p>
        <p>
          All Rights Reserved | 
          <a href="/additional/termsAndConditions.html" target="_blank">
            Terms and Conditions
          </a>{" "}
          |{" "}
          <a href="/additional/privacyPolicy.html" target="_blank">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
