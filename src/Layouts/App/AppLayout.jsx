// src/layouts/AppLayout.jsx
import React from 'react';
import './AppLayout.css';

const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      {children}
    </div>
  );
};

export default AppLayout;
