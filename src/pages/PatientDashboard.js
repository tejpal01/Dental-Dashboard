import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import Navigation from '../components/Navigation';

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const { incidents } = useContext(DataContext);

  if (!user || user.role !== 'Patient') {
    return (
      <div className="page-container">
        <p>Error: Not authorized or session expired. Please login again.</p>
      </div>
    );
  }

  const patientIncidents = incidents.filter(i => i.patientId === user.patientId);

  return (
    <div className="page-container">
      <Navigation />
      <h2>Welcome, {user.email}</h2>

      <h3>Your Appointments</h3>
      {patientIncidents.length === 0 ? (
        <p>No appointments found yet.</p>
      ) : (
        patientIncidents.map(i => (
          <div key={i.id} className="incident-card">
            <strong>{i.title}</strong><br />
            📅 Appointment: {new Date(i.appointmentDate).toLocaleString()}<br />
            💬 Comments: {i.comments}<br />
            🏥 Treatment: {i.treatment || 'N/A'}<br />
            💸 Cost: ₹{i.cost || 'N/A'}<br />
            📌 Status: {i.status}<br />
            📅 Next Date: {i.nextDate ? new Date(i.nextDate).toLocaleString() : 'N/A'}<br />
            📁 Files:
            <ul>
              {(i.files || []).map((file, idx) => (
                <li key={idx}>
                  <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientDashboard;
