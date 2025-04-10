import React from "react";
import "./AccountFooter.css";

function AccountFooter() {
  return (
    <footer className="account-footer">
      <div className="footer-social">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-youtube"></i>
      </div>

      <div className="footer-links-grid">
        <div>
          <a href="#">Audio Description</a>
          <a href="#">Investor Relations</a>
          <a href="#">Privacy</a>
          <a href="#">Contact Us</a>
        </div>
        <div>
          <a href="#">Help Center</a>
          <a href="#">Jobs</a>
          <a href="#">Legal Notices</a>
          <a href="#">Do Not Sell or Share My Personal Information</a>
        </div>
        <div>
          <a href="#">Gift Cards</a>
          <a href="#">Netflix Shop</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Ad Choices</a>
        </div>
        <div>
          <a href="#">Media Center</a>
          <a href="#">Terms of Use</a>
          <a href="#">Corporate Information</a>
        </div>
      </div>

      <button className="service-code-btn">Service Code</button>

      <p className="footer-note">© 1997–2024 Netflix, Inc.</p>
    </footer>
  );
}

export default AccountFooter;
