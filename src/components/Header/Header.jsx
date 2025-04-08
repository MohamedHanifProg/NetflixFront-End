import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <a href="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix Logo"
        />
      </a>
    </header>
  );
}

export default Header;
