import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../admin.css';

const DEMO_ACCOUNTS = [
  { email: 'admin@ebrave.in', password: 'admin123', role: 'Super Admin', color: '#6366f1' },
  { email: 'ops@ebrave.in', password: 'ops123', role: 'Operations Manager', color: '#10b981' },
  { email: 'counsel@ebrave.in', password: 'counsel123', role: 'Counselor', color: '#f59e0b' },
  { email: 'content@ebrave.in', password: 'content123', role: 'Content Manager', color: '#3b82f6' },
];

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@ebrave.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) navigate('/admin/dashboard');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = login(email, password);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.error || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  const fillDemo = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setError('');
  };

  return (
    <div className="adm-login-page">
      {/* Background */}
      <div className="adm-login-bg">
        <div className="adm-login-orb adm-login-orb1" />
        <div className="adm-login-orb adm-login-orb2" />
        <div className="adm-login-grid" />
      </div>

      <div className="adm-login-container">
        {/* Left Panel — Branding */}
        <div className="adm-login-left">
          <div className="adm-login-brand">
            <div className="adm-login-logo">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 3L35 10V20C35 28.284 28.284 35 20 37C11.716 35 5 28.284 5 20V10L20 3Z" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="1.5"/>
                <path d="M14 20L18 24L26 16" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="adm-login-brand-name">E-Brave <span>EOS</span></div>
              <div className="adm-login-brand-tag">AI-Powered Operations</div>
            </div>
          </div>

          <div className="adm-login-features">
            <h2>Your operational command center</h2>
            <p>Manage leads, counseling, webinars, and growth — all powered by EOS AI.</p>
            <div className="adm-login-feature-list">
              {[
                { icon: '🎯', text: 'CRM & Lead Intelligence' },
                { icon: '🤖', text: 'EOS AI Assistant' },
                { icon: '📊', text: 'Analytics & Insights' },
                { icon: '⚡', text: 'Workflow Automation' },
                { icon: '📅', text: 'Counseling Management' },
                { icon: '🌐', text: 'Website Intelligence' },
              ].map((f, i) => (
                <div key={i} className="adm-login-feature-item">
                  <span>{f.icon}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="adm-login-version">EOS v1.0 · E-Brave Internal System</div>
        </div>

        {/* Right Panel — Form */}
        <div className="adm-login-right">
          <div className="adm-login-card">
            <div className="adm-login-card-header">
              <h1>Sign in to EOS</h1>
              <p>Access the E-Brave operational control center</p>
            </div>

            {error && (
              <div className="adm-login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="adm-login-form">
              <div className="adm-form-group">
                <label>Email address</label>
                <div className="adm-input-icon-wrap">
                  <svg className="adm-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <input
                    type="email"
                    className="adm-input adm-input-with-icon"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <label>Password</label>
                <div className="adm-input-icon-wrap">
                  <svg className="adm-input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="adm-input adm-input-with-icon adm-input-with-icon-right"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button type="button" className="adm-input-toggle" onClick={() => setShowPassword(p => !p)}>
                    {showPassword
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    }
                  </button>
                </div>
              </div>

              <button type="submit" className="adm-btn adm-btn-primary adm-btn-full" disabled={loading}>
                {loading ? (
                  <span className="adm-btn-loading">
                    <span className="adm-spinner" />
                    Signing in...
                  </span>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    Sign in to EOS
                  </>
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="adm-login-demo">
              <div className="adm-login-demo-label">Quick access — Demo accounts</div>
              <div className="adm-login-demo-grid">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    className="adm-login-demo-btn"
                    onClick={() => fillDemo(acc)}
                    style={{ '--demo-color': acc.color }}
                  >
                    <span className="adm-login-demo-dot" style={{ background: acc.color }} />
                    <span>{acc.role}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
