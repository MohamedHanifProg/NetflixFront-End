// src/layouts/AdminLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('selectedProfile');
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <nav className="admin-nav">
        <div className="admin-nav-left">
          <ul className="nav-links">
            <li><Link to="/admin/dashboard">Dashboard</Link></li>
            <li><Link to="/admin/programs">Programs</Link></li>
            <li><Link to="/admin/logs">Logs</Link></li>
          </ul>
        </div>
        <div className="admin-nav-right">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
