import React, { createContext, useState } from 'react';
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken');

const secret = 'mysecretkey';

export const AuthContext = createContext();

// creates login token and provides login / logout functions
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || {});

    const login = (token) => {
        setIsAuthenticated(true);
        setToken(token);
        // saves token to local storage
        localStorage.setItem('token', JSON.stringify(token));

        // decode JWT token2 using jwtDecode to get user data 
        const token2 = localStorage.getItem('token2')
        console.log("token2: " + token2)
        const decoded = jwt.verify(token2, secret);
        // const decoded = jwtDecode(token2);
        console.log("decoded: " + decoded);
        localStorage.setItem('token3', JSON.stringify(decoded[0]));
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
        if (data.length > 0) {
            // sign jwt token with no expiry date
            const userId = { id: 123 };
            jwt.sign({ ...data }, secret, (err, asyncToken) => {
                if (err) throw err;
                console.log(asyncToken);
                // Save the user ID to local storage
                localStorage.setItem('userId', userId);
                // Save the JWT token to local storage
                localStorage.setItem('token2', asyncToken);
                // return asyncToken;
            });
            return data;
        }
        
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

// sends request to edit staff details
export const editUser = async (staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw) => {
    const response = await fetch(`http://localhost:6001/staff_details/${staff_id}`, {
        method: 'PUT',
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
        console.log(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw)
        throw new Error('Error creating new staff details');
    }
};
