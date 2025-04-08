import { useState } from 'react';
import '../styles/Signup.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', form);
  };

  return (
    <div className="signup-page">
      <div className="signup-overlay"></div>

      <Header />

      <div className="signup-content">
        <form className="signup-box" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
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
          <button type="submit">Sign Up</button>

          <p className="recaptcha-note">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Learn more.
            </a>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
