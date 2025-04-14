import React, { useState } from 'react';
import '../styles/Signup.css';
import AuthLayout from '../Layouts/Auth/AuthLayout';
import { useNavigate } from 'react-router-dom';
import API_URL from '../config';





function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signup failed');
        return;
      }

      console.log('Signup successful:', data);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('An error occurred during signup. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="signup-content">
        <form className="signup-box" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          {error && <div className="error">{error}</div>}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email or phone number"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
          <p className="recaptcha-note">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more.
            </a>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
export default Signup;
