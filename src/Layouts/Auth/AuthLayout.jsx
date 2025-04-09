// src/layouts/AuthLayout.jsx
import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './AuthLayout.css';  // We'll create this next

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <Header />
      <div className="auth-content">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
