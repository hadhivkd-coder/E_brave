import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          
          {/* Left: Brand & Description */}
          <div className="footer-brand">
            <h2 className="footer-logo">E-Brave</h2>
            <p className="footer-description">
              Helping students make informed academic, career, and future decisions.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#compass-journey">Compass Journey</a></li>
              <li><a href="#experience">Program Experience</a></li>
              <li><a href="#outcomes">Outcomes</a></li>
              <li><a href="#apply">Contact</a></li>
            </ul>
          </div>

          {/* Right: Contact Information */}
          <div className="footer-contact">
            <h3>Contact Information</h3>
            <ul className="contact-details">
              <li>
                <span className="contact-label">Website:</span>
                <a href="https://ebrave.in" target="_blank" rel="noopener noreferrer">ebrave.in</a>
              </li>
              <li>
                <span className="contact-label">Email:</span>
                <a href="mailto:ebravestudies@gmail.com">ebravestudies@gmail.com</a>
              </li>
              <li>
                <span className="contact-label">Phone:</span>
                <a href="tel:+919628281922">+91 96282 81922</a>
              </li>
              <li>
                <span className="contact-label">Instagram:</span>
                <a href="https://instagram.com/ebrave.in" target="_blank" rel="noopener noreferrer">@ebrave.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2026 E-Brave. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
