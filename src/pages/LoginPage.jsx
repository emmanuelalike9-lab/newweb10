import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage({ onLogin, user }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
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

    if (!emailPattern.test(form.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (form.password.trim().length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      onLogin({ email: form.email.trim(), password: form.password });
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
              <p className="eyebrow">WELCOME BACK</p>
              <h1>Login</h1>
            </div>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <label>
              <span>Email address</span>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </label>

            <label>
              <span>Password</span>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
            </label>

            {error && <p className="form-error">{error}</p>}

            <div className="auth-actions">
              <button type="submit" className="primary-button">Log in</button>
              <Link to="/signup" className="text-link auth-link">Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
