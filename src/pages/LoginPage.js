import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form);
  };

  return (
    <div className="page-container">
      <h2>Dental Center Login</h2>

      <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
        <strong>Note for Patients:</strong> Your password is auto-generated as <code>firstname</code> + <code>birth year</code> (e.g., <strong>john1990</strong>)
      </p>

      <form onSubmit={handleSubmit} className="form-card">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Email Address:</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
