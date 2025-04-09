// src/Layouts/Auth/AuthLayout.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AuthLayout.css'; // You'll create this next

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="auth-overlay"></div>
      <Header />
      <div className="auth-content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
