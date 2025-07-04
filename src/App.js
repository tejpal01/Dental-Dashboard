import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PatientsPage from './pages/PatientsPage';
import IncidentsPage from './pages/IncidentsPage';
import CalendarPage from './pages/CalendarPage';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

const App = () => (
  <AuthProvider>
    <DataProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute role="Admin" />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/patients" element={<PatientsPage />} />
          <Route path="/admin/incidents" element={<IncidentsPage />} />
          <Route path="/admin/calendar" element={<CalendarPage />} />
        </Route>
        <Route element={<ProtectedRoute role="Patient" />}>
          <Route path="/patient" element={<PatientDashboard />} />
        </Route>
      </Routes>
    </DataProvider>
  </AuthProvider>
);

export default App;
