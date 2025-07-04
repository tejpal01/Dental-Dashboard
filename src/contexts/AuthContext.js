import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  const stored = JSON.parse(localStorage.getItem('users') || '[]');
  const [users, setUsers] = useState(stored.length ? stored : [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" }
  ]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));

  const login = ({ email, password }) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('user', JSON.stringify(found));
      nav(found.role === 'Admin' ? '/admin' : '/patient');
    } else alert('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    nav('/');
  };

  return (
    <AuthContext.Provider value={{ user, users, setUsers, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
