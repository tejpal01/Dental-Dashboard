import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../contexts/DataContext';
import { AuthContext } from '../contexts/AuthContext';

const PatientsPage = () => {
  const { patients, addPatient, updatePatient, deletePatient } = useContext(DataContext);
  const { users, setUsers } = useContext(AuthContext);

  const [form, setForm] = useState({
    id: null,
    name: '',
    dob: '',
    email: '',
    contact: '',
    healthInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.dob || !form.email) {
      alert("Name, DOB, and Email are required");
      return;
    }

    const patientId = form.id || uuidv4();
    const newPatient = { ...form, id: patientId };

    // Save patient
    if (form.id) {
      updatePatient(form.id, newPatient);
      alert('Patient updated');
    } else {
      addPatient(newPatient);
      alert('Patient added');

      // Also create login user with auto-generated password
      const birthYear = new Date(form.dob).getFullYear();
      const firstname = form.name.split(' ')[0].toLowerCase();
      const autoPassword = `${firstname}${birthYear}`;

      const newUser = {
        id: uuidv4(),
        email: form.email,
        password: autoPassword,
        role: 'Patient',
        patientId
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);

      alert(`Patient login created.\nEmail: ${form.email}\nPassword: ${autoPassword}`);
    }

    setForm({
      id: null,
      name: '',
      dob: '',
      email: '',
      contact: '',
      healthInfo: ''
    });
  };

  const handleEdit = (patient) => {
    setForm(patient);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this patient?')) {
      deletePatient(id);
    }
  };

  return (
    <div className="page-container">
      <h2>Manage Patients</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <label>
          Full Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Date of Birth:
          <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>
          Contact:
          <input name="contact" value={form.contact} onChange={handleChange} />
        </label>

        <label>
          Health Info:
          <textarea name="healthInfo" value={form.healthInfo} onChange={handleChange} />
        </label>

        <button type="submit">{form.id ? 'Update' : 'Add'} Patient</button>
      </form>

      <h3>All Patients</h3>
      {patients.map(p => (
        <div key={p.id} className="incident-card">
          <strong>{p.name}</strong><br />
          📧 {p.email}<br />
          📱 {p.contact}<br />
          🎂 {p.dob}<br />
          📝 {p.healthInfo}<br />
          <div style={{ marginTop: '0.5rem' }}>
            <button
              onClick={() => handleEdit(p)}
              style={{ marginRight: '0.5rem', background: '#ffcc00', color: '#333' }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(p.id)}
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

export default PatientsPage;
