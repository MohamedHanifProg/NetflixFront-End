import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-title">
        Questions? Call <a href="tel:18445052993">1-844-505-2993</a>
      </p>
      <div className="footer-grid">
        <a href="#">FAQ</a>
        <a href="#">Help Center</a>
        <a href="#">Account</a>
        <a href="#">Media Center</a>
        <a href="#">Investor Relations</a>
        <a href="#">Jobs</a>
        <a href="#">Redeem Gift Cards</a>
        <a href="#">Buy Gift Cards</a>
        <a href="#">Ways to Watch</a>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy</a>
        <a href="#">Cookie Preferences</a>
        <a href="#">Corporate Information</a>
        <a href="#">Contact Us</a>
        <a href="#">Speed Test</a>
        <a href="#">Legal Notices</a>
      </div>
      <div className="footer-lang">
        <select className="language-select">
          <option value="en">🌐 English</option>
          <option value="he">עברית</option>
        </select>
      </div>
    </footer>
  );
}

export default Footer;
