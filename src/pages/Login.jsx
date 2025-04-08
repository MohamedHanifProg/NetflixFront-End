import { useState } from 'react';
import '../styles/Login.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', form);
    // TODO: connect to backend
  };

  return (
    <div className="login-page">
      <div className="login-overlay"></div>
      <Header />

      <div className="login-content">
      <form className="login-box" onSubmit={handleSubmit}>
  <h1>Sign In</h1>

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

  {/* ✅ Centered forgot password */}
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

      <Footer />
    </div>
  );
}

export default Login;
