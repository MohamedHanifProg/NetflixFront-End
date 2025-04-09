import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <nav className="menu-bar">
      <div className="menu-left">
        <Link to="/home">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix"
            className="menu-logo"
          />
        </Link>

        <ul className="menu-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="#">TV Shows</Link></li>
          <li><Link to="#">Movies</Link></li>
          <li><Link to="#">New & Popular</Link></li>
          <li><Link to="#">My List</Link></li>
          <li><Link to="#">Browse</Link></li>
        </ul>
      </div>

      <div className="menu-right">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Avatar"
          className="menu-avatar"
        />
      </div>
    </nav>
  );
};

export default Menu;
