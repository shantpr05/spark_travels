import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./FooterComponent.css";

const FooterComponent = () => {
  return (
    <footer className="footer">
      {/* Left section of the footer containing logo and description */}
      <div className="footer-left">
        <div className="footer-logo">
          {" "}
          <img src={logo} alt="Logo" width="150" height="auto" />
        </div>
        <p>
          We will take care of your beautiful holiday <br /> instantly and
          memorably.
        </p>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaLinkedinIn />
          <FaYoutube />
        </div>
      </div>

      {/* Right section of the footer containing copyright and links */}
      <div className="footer-right">
        <p>Copyright © 2025</p>
        <p>
          All Rights Reserved |
          <a
            href="/assets/termsAndConditions.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms and Conditions
          </a>
          |
          <a
            href="/assets/privacyPolicy.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
