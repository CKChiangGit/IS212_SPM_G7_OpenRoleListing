import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// creates login token and provides login / logout functions
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [token, setToken] = useState('');
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || {});

    const login = (token) => {
      setIsAuthenticated(true);
      setToken(token);
      // saves token to local storage
      localStorage.setItem('token', JSON.stringify(token));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

// sends request to retrieve staff details
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

// sends request to create new staff details
export const createUser = async (staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw) => {
    const response = await fetch('http://localhost:6001/staff_creation', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw }),
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
        return data;
    } else {
        throw new Error('Error creating new staff details');
    }
};
