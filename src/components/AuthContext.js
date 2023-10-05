import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const login = (token) => {
    setIsAuthenticated(true);
    setToken(token);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const authenticateUser = async (email, password) => {
  const response = await fetch('http://localhost:6001/staff_details', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (response.ok) {
    console.log(data)
    return data;
  } else {
    throw new Error(data.message);
  }
};