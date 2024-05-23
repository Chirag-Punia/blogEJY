import React from "react";
import "../styles/footer.css"; // Assuming you will create a CSS file for styling
import footerlogo from "../images/footerlogo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <img className="footer-logo" src={footerlogo} alt="Logo" />
      </div>
      <div className="footer-links">
        <h4>Links</h4>
        <a href="#why">Why EJY Health?</a>
        <a href="#benefits">Benefits of joining the waitlist?</a>
        <a href="#connect">How do I connect?</a>
        <a href="#paid">Is it a paid platform?</a>
        <a href="#download">How to download the app?</a>
      </div>
      <div className="footer-about">
        <h4>About</h4>
        <a href="#about">About Us</a>
        <a href="#team">Our Team</a>
        <a href="#careers">Careers</a>
      </div>
      <div className="footer-app">
        <h4>App</h4>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#support">Support</a>
      </div>
      <div className="footer-social">
        <h4>Follow Us</h4>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
