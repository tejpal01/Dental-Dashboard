import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {user.role === 'Admin' && (
        <>
          <button onClick={() => navigate('/admin')}>Dashboard</button>
          <button onClick={() => navigate('/admin/patients')}>Patients</button>
          <button onClick={() => navigate('/admin/incidents')}>Incidents</button>
          <button onClick={() => navigate('/admin/calendar')}>Calendar</button>
        </>
      )}
      {user.role === 'Patient' && (
        <button onClick={() => navigate('/patient')}>My Dashboard</button>
      )}
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navigation;
