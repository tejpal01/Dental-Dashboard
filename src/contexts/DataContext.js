import React, { createContext, useState, useEffect } from 'react';
import { getStorage, setStorage } from '../utils/storage';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    setPatients(getStorage('patients') || []);
    setIncidents(getStorage('incidents') || []);
  }, []);

  useEffect(() => {
    setStorage('patients', patients);
  }, [patients]);

  useEffect(() => {
    setStorage('incidents', incidents);
  }, [incidents]);

  const addPatient = (p) => setPatients([...patients, p]);
  const updatePatient = (id, data) => setPatients(patients.map(p => p.id === id ? { ...p, ...data } : p));
  const deletePatient = (id) => setPatients(patients.filter(p => p.id !== id));

  const addIncident = (i) => setIncidents([...incidents, i]);
  const updateIncident = (id, data) => setIncidents(incidents.map(i => i.id === id ? { ...i, ...data } : i));
  const deleteIncident = (id) => setIncidents(incidents.filter(i => i.id !== id));

  return (
    <DataContext.Provider value={{
      patients, addPatient, updatePatient, deletePatient,
      incidents, addIncident, updateIncident, deleteIncident
    }}>
      {children}
    </DataContext.Provider>
  );
};
