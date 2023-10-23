import React, { createContext, useState } from 'react';
// import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';

export const AuthContext = createContext();

// creates login token and provides login / logout functions
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [jwt_token, setJWTToken] = useState(localStorage.getItem('jwt_token') || {});

    const login = (token) => {
        setIsAuthenticated(true);
        // console.log("token: " + JSON.stringify(token))
        setToken(token);

        // // decode JWT jwt_token using jwtDecode to get user data 
        // console.log("jwt_token: " + JSON.stringify(jwt_token))
        // const decoded = jwt.verify(jwt_token, secret);
        // console.log("decoded: " + decoded);
        // localStorage.setItem('token3', JSON.stringify(decoded[0]));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken('');
        localStorage.removeItem('token3');
        localStorage.removeItem('userId');
        localStorage.removeItem('jwt_token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

// sends request to retrieve staff details
export const authenticateUser = async (email, password) => {
    const response = await fetch('http://localhost:5007/staff_details', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
        console.log("response ok " + JSON.stringify(data.data.staff_details[0]))
        console.log("response ok " + data.data.staff_details.length)
        if (data.data.staff_details.length > 0) {
            // sign jwt token with no expiry date
            // const userId = { id: 123 };
            console.log(data.data.staff_details[0])
            // const test = {"staff_id":2,"fname":"JACK","lname":"SIM","dept":"MANAGEMENT","email":"jack.sim.2@all-in-one.com.sg","phone":"86808357","biz_address":"65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065","sys_role":"hr","pw":"345345"}
            jwt.sign(data.data.staff_details[0], secret, (err, asyncToken) => {
                if (err) throw err;
                console.log(asyncToken);
                // Save the user ID & JWT token to local storage
                // localStorage.setItem('userId', userId);
                localStorage.setItem('jwt_token', asyncToken);
                
                // for REFERENCING readable JWT TOKEN
                const decoded = jwt.verify(asyncToken, secret);
                console.log("decoded: " + JSON.stringify(decoded));
                localStorage.setItem('token3', JSON.stringify(decoded));

                // return asyncToken;
            });
            console.log("jwt has been signed")
            return data.data.staff_details[0];
        } else {
            // throw new Error("Invalid email or password");
            throw new Error("Invalid email or password" + JSON.stringify(data.data.staff_details[0]));
        }
        
    } else {
        throw new Error(data.message);
    }
};

// sends request to get all staff details
export const getAllUser = async () => {
    const response = await fetch('http://localhost:5007/staff_details', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
        return data;
    } else {
        throw new Error('Error retrieving staff details');
    }
};

// sends request to create new staff details
export const createUser = async (staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw) => {
    const response = await fetch('http://localhost:5007/staff_creation', {
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
    const response = await fetch(`http://localhost:5007/staff_details/${staff_id}`, {
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

// sends request to view open role details
export const viewRole = async (staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw) => {
    const response = await fetch(`http://localhost:3003/openroles`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
        return data;
    } else {
        // console.log("Error retrieving open role details")
        throw new Error('Error retrieving open role details');
    }
};
