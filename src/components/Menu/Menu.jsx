// Menu.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const loggedInProfile = JSON.parse(sessionStorage.getItem("selectedProfile"));

  const isActive = (path) => location.pathname.startsWith(path);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Log out: remove session data and navigate to login page
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("selectedProfile");
    navigate("/"); // Assuming "/" is the login page
  };

  // Switch profile: navigate to the profiles page
  const handleSwitchProfile = () => {
    navigate("/profiles");
  };

  return (
    <nav className="menu-bar">
      <div className="menu-left">
        <Link to="/home">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix Logo"
            className="menu-logo"
          />
        </Link>
        <Link to="/home" className={isActive("/home") ? "active" : ""}>
          Home
        </Link>
        <Link to="/tv-shows" className={isActive("/tv-shows") ? "active" : ""}>
          TV Shows
        </Link>
        <Link to="/movies" className={isActive("/movies") ? "active" : ""}>
          Movies
        </Link>
        <Link to="/new-popular" className={isActive("/new-popular") ? "active" : ""}>
          New & Popular
        </Link>
        <Link to="/mylist" className={isActive("/mylist") ? "active" : ""}>
          My List
        </Link>
        <Link to="/browse" className={isActive("/browse") ? "active" : ""}>
          Browse
        </Link>
      </div>
      <div className="menu-right">
        <button className="icon-button">
          <i className="fas fa-search"></i>
        </button>
        <button className="icon-button">
          <i className="fas fa-bell"></i>
        </button>
        <div
          className="profile-container"
          onClick={toggleDropdown}
          style={{ cursor: "pointer", position: "relative" }}
        >
          <img
            className="profile-avatar"
            // Use logged-in profile avatar from sessionStorage, with fallback
            src={
              loggedInProfile?.avatar ||
              "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            }
            alt="User Avatar"
          />
          <i className="fas fa-caret-down dropdown-icon"></i>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleSwitchProfile} className="dropdown-item">
                Switch Profile
              </button>
              <button onClick={handleLogout} className="dropdown-item">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Menu;
