import { useState, type FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setIsLoading(true);
    try {
      await login(email, password);
    } catch {
      setError('Invalid email or password. Try the demo credentials below.');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemo = (role: 'employee' | 'admin') => {
    if (role === 'employee') { setEmail('employee@demo.com'); setPassword('demo123'); }
    else                      { setEmail('admin@demo.com');    setPassword('admin123'); }
    setError('');
  };

  return (
    <div className="login-page">
      {/* Left decorative panel */}
      <div className="login-page__left">
        <div className="login-page__brand">
          <span className="login-page__brand-name">REWA</span>
          <span className="login-page__brand-sub">TECHNO</span>
        </div>
        <div className="login-page__tagline">
          <h2>Your workspace,<br />unified.</h2>
          <p>Track attendance, manage leaves, collaborate on projects — all in one place.</p>
        </div>
        <div className="login-page__dots">
          {[...Array(12)].map((_, i) => <span key={i} className="login-page__dot" />)}
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-page__right">
        <div className="login-card">
          <div className="login-card__header">
            <h1 className="login-card__title">Sign In</h1>
            <p className="login-card__sub">Access your employee dashboard</p>
          </div>

          {/* Demo pills */}
          <div className="login-card__demo">
            <span className="login-card__demo-label">Quick Demo:</span>
            <button className="login-card__demo-btn" onClick={() => fillDemo('employee')}>👤 Employee</button>
            <button className="login-card__demo-btn login-card__demo-btn--admin" onClick={() => fillDemo('admin')}>🔑 Admin</button>
          </div>

          <form className="login-card__form" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="login-field">
              <label className="login-field__label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="login-field__input"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="login-field">
              <label className="login-field__label" htmlFor="password">Password</label>
              <div className="login-field__password-wrap">
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  className="login-field__input"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="login-field__eye"
                  onClick={() => setShowPass(p => !p)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && <div className="login-card__error">{error}</div>}

            {/* Submit */}
            <button type="submit" className="login-card__submit" disabled={isLoading}>
              {isLoading
                ? <span className="login-card__spinner" />
                : <><LogIn size={16} /> Sign In</>
              }
            </button>
          </form>

          <p className="login-card__footer">
            © 2025 <span className="text-green">Rewa Techno</span>. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
