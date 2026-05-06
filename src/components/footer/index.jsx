import React from "react";
import "./index.css";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";  

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left logos */}
        <div className="footer-left">
          <div className="footer-logo">
            <span className="footer-caption">Organized by</span>
            <img src="/iyc-logo.png" alt="International Youth Canada" />
            {/* <span className="footer-caption">International Youth Canada</span> */}
          </div>
          <div className="footer-logo">
            <span className="footer-caption">Powered by</span>
            <img src="/levitate-logo.png" alt="Levitate Entertainment" />
            {/* <span className="footer-caption">Levitate Entertainment</span> */}
          </div>
        </div>

        {/* Center contact info */}
        <div className="footer-center">
          <h3 className="footer-heading">Contact Us</h3>
          <p>+1 (705) 930-6692</p>
          <p>contact@canadaglobalfest.ca </p>
        </div>

        {/* Right social + button */}
        <div className="footer-right">
          <div className="footer-social">
            <a href="https://www.instagram.com/globalfestcanada/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://www.tiktok.com/@tiktok.global.fes?_r=1&_t=ZS-968ifIoWNhk" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>

          </div>
          {/* ✅ Use Link instead of button */}
          <Link to="/volunteer" className="join-btn">
            Join as a Volunteer
          </Link>
        </div>
      </div>

      {/* Copyright segment */}
      <div className="footer-bottom">
        <hr />
        <div className="footer-logo">
          <img src="/logo.png" alt="Global Fest Logo" />
        </div>
        <p>© 2026 Global Fest Toronto. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
