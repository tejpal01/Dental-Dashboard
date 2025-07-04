import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import Navigation from '../components/Navigation';

const AdminDashboard = () => {
  const { patients, incidents } = useContext(DataContext);

  const upcoming = [...incidents]
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const revenue = incidents
    .filter(i => i.status === 'Completed')
    .reduce((sum, i) => sum + (parseFloat(i.cost) || 0), 0);

  const topPatients = patients.map(p => {
    const count = incidents.filter(i => i.patientId === p.id).length;
    return { name: p.name, count };
  }).sort((a, b) => b.count - a.count).slice(0, 5);

  const pending = incidents.filter(i => i.status === 'Pending').length;
  const completed = incidents.filter(i => i.status === 'Completed').length;

  return (
    <div className="page-container">
      <Navigation />

      <h2>Admin Dashboard</h2>
      <div className="dashboard-cards">
        <div className="card">Total Revenue: ₹{revenue}</div>
        <div className="card">Pending: {pending}</div>
        <div className="card">Completed: {completed}</div>
      </div>

      <h3>Top Patients</h3>
      <ul>
        {topPatients.map((p, i) => <li key={i}>{p.name} - {p.count} appointments</li>)}
      </ul>

      <h3>Next 10 Appointments</h3>
      <ul>
        {upcoming.map(i => (
          <li key={i.id}>
            {new Date(i.appointmentDate).toLocaleString()} - {i.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
