import React, { useContext, useState } from 'react';
import { DataContext } from '../contexts/DataContext';
import { v4 as uuidv4 } from 'uuid';
import Navigation from '../components/Navigation';

const IncidentsPage = () => {
  const { patients, incidents, addIncident, updateIncident, deleteIncident } = useContext(DataContext);

  const [form, setForm] = useState({
    id: null, patientId: '', title: '', description: '',
    comments: '', appointmentDate: '', cost: '',
    treatment: '', status: 'Pending', nextDate: '', files: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileObjs = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setForm(prev => ({ ...prev, files: fileObjs }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      updateIncident(form.id, form);
      alert('Incident updated!');
    } else {
      addIncident({ ...form, id: uuidv4() });
      alert('Incident added!');
    }
    setForm({
      id: null, patientId: '', title: '', description: '',
      comments: '', appointmentDate: '', cost: '',
      treatment: '', status: 'Pending', nextDate: '', files: []
    });
  };

  const handleEdit = (incident) => {
    setForm(incident);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      deleteIncident(id);
    }
  };

  return (
    <div className="page-container">
      <Navigation />
      <h2>Manage Appointments / Incidents</h2>

      <form onSubmit={handleSubmit} className="form-card">
      <label>
        Select Patient:
        <select name="patientId" value={form.patientId} onChange={handleChange} required>
          <option value="">-- Select Patient --</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </label>

      <label>
        Title:
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label>
        Description:
        <textarea name="description" value={form.description} onChange={handleChange} />
      </label>

      <label>
        Comments:
        <textarea name="comments" value={form.comments} onChange={handleChange} />
      </label>

      <label>
        Appointment Date:
        <input name="appointmentDate" type="datetime-local" value={form.appointmentDate} onChange={handleChange} required />
      </label>

      <label>
        Cost (₹):
        <input name="cost" type="number" value={form.cost} onChange={handleChange} />
      </label>

      <label>
        Treatment:
        <input name="treatment" value={form.treatment} onChange={handleChange} />
      </label>

      <label>
        Status:
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </label>

      <label>
        Next Appointment Date:
        <input name="nextDate" type="datetime-local" value={form.nextDate} onChange={handleChange} />
      </label>

      <label>
        Upload Files:
        <input type="file" multiple onChange={handleFileChange} />
      </label>

      <button type="submit">{form.id ? 'Update' : 'Add'} Incident</button>
    </form>

      <h3>All Incidents</h3>
      {incidents.map(i => (
        <div key={i.id} className="incident-card">
          <strong>{i.title}</strong> — {new Date(i.appointmentDate).toLocaleString()}<br />
          👤 Patient: {patients.find(p => p.id === i.patientId)?.name || 'Unknown'}<br />
          💬 Comments: {i.comments}<br />
          💸 Cost: ₹{i.cost}<br />
          🏥 Treatment: {i.treatment}<br />
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
          <div style={{ marginTop: '0.5rem' }}>
            <button
              onClick={() => handleEdit(i)}
              style={{ marginRight: '0.5rem', background: '#ffcc00', color: '#333' }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(i.id)}
              style={{ background: '#ff4d4d', color: 'white' }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncidentsPage;
