// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate(); // Call useNavigate here
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const onLogout = () => {
    // Clear user data
    localStorage.removeItem('user');
    setUser(null);
    // Redirect to home page
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, onLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
