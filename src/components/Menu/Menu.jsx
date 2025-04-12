// Menu.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

function Menu() {
    // useLocation helps us determine which path we are currently on
    const location = useLocation();

    // Checks if the current path starts with the given string
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <nav className="menu-bar">
            <div className="menu-left">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                    alt="Netflix Logo"
                    className="menu-logo"
                />

                {/* If your Home route is /home, check for /home instead of "/" */}
                <Link to="/home" className={isActive("/home") ? "active" : ""}>
                    Home
                </Link>

                {/* Use the same path (/tv-shows) for the Link and isActive */}
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
