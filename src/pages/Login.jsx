// src/pages/Login.jsx
import React, { useState } from 'react';
import '../styles/Login.css';
import AuthLayout from '../Layouts/Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';





function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      console.log('Login successful:', data);
      // Save the token in localStorage or context if needed
      localStorage.setItem('token', data.token);
      // Redirect to the dashboard or WhoIsWatching page
      sessionStorage.setItem('token', data.token);
      navigate('/profiles');
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="login-content">
        <form className="login-box" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {error && <div className="error">{error}</div>}
          <input
            type="text"
            name="email"
            placeholder="Email or phone number"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign In</button>
          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <div className="login-links">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>
          <div className="signup-now">
            New to Netflix? <a href="/signup">Sign up now.</a>
          </div>
          <p className="recaptcha-note">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Learn more.
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
