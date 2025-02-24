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
import { useNavigate } from "react-router-dom";

const FooterComponent = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-logo" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" width="150" height="auto" />
        </div>
        <p>
          We will take care of your beautiful holiday <br /> instantly and
          memorably.
        </p>
        {/* links should be in lists for accessibility */}
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
        <p className="term">
          All Rights Reserved |
          {/* links should be in lists for accessibility */}
          <a
            href="/assets/termsAndConditions.html"
            target="_blank"
            rel="noopener noreferrer"
            className="terms"
          >
            Terms and Conditions
          </a>
          |
          <a
            href="/assets/privacyPolicy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="terms"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default FooterComponent;
