import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

function Menu() {
  return (
    <nav className="menu-bar">
      <div className="menu-left">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix Logo"
          className="menu-logo"
        />
        <Link to="/">Home</Link>
        <Link to="#">TV Shows</Link>
        <Link to="#">Movies</Link>
        <Link to="#">New & Popular</Link>
        <Link to="#">My List</Link>
        <Link to="#">Browse</Link>
      </div>
      <div className="menu-right">
  <button className="icon-button">
    <i className="fas fa-search"></i>
  </button>
  <button className="icon-button">
    <i className="fas fa-bell"></i>
  </button>

  <div className="profile-container">
    <img
      className="profile-avatar"
      src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
      alt="User Avatar"
    />
    <i className="fas fa-caret-down dropdown-icon"></i>
  </div>
</div>

    </nav>
  );
}

export default Menu;
