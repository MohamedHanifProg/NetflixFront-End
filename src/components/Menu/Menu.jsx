// Menu.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname.startsWith(path);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Handles logging out: clears stored auth and navigates to login page.
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedProfile");
    // You can also clear any user state if maintained by context or Redux
    navigate("/"); // Assuming "/" is your login or landing page
  };

  // Handles switching profiles: navigates to the profiles page.
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
        <Link
          to="/movies"
          className={isActive("/movies") ? "active" : ""}
        >
          Movies
        </Link>
        <Link
          to="/new-popular"
          className={isActive("/new-popular") ? "active" : ""}
        >
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
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
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
