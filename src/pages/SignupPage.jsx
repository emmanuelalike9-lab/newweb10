import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage({ onSignup, user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/checkout');
    }
  }, [navigate, user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    if (!emailPattern.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      onSignup({ name: form.name.trim(), email: form.email.trim(), password: form.password });
    } catch (submitError) {
      setError(submitError.message);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-card">
          <div className="auth-header">
            <span className="wordmark-icon">g.</span>
            <div>
              <p className="eyebrow">START YOUR JOURNEY</p>
              <h1>Sign up</h1>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Full name</span>
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
            </label>

            <label>
              <span>Email address</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </label>

            <label>
              <span>Password</span>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Create a password" />
            </label>

            <label>
              <span>Confirm password</span>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" />
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="auth-actions">
              <button type="submit" className="primary-button">Create account</button>
              <Link to="/login" className="text-link auth-link">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
