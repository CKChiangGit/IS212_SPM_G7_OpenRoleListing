import { React, useContext, useEffect, useState } from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from '../hooks/AuthContext';
// import { useAuthStatus } from "../hooks/useAuthStatus";
const jwt = require('jsonwebtoken');

export default function PrivateRoute() {

    // // get login token    
    const [token, setToken] = useState(null);
    const jwt_token = localStorage.getItem('jwt_token');
    const secret = 'mysecretkey';
    useEffect(() => {
        if (jwt_token !== null) {
            const decodedToken = jwt.verify(jwt_token, secret);
            setToken(decodedToken[0]);
            console.log("decoded " + JSON.stringify(decodedToken[0]));
        }
    }, [jwt_token, secret]);
    
    localStorage.removeItem('staff_edit'); 
    return jwt_token ? <Outlet /> : <Navigate to="/login" />;

    // // // FIREBASE AUTHENTICATION START HERE
    // // const isLoggedIn = false;
    // const { isLoggedIn, checkingStatus, counter} = useAuthStatus();
    // console.log("isLoggedIn " + isLoggedIn + counter)
    // if (checkingStatus) {
    //     <h3>Loading...</h3>
    // }
    // // useAuthStatus usually fails the first time, so run at least twice before checking status
    // if (counter === 1) {
    //     console.log('success')
    //     // if logged in, go to Outlet (nested Profile.jsx in App.js), else redirect to Login.jsx 
    //     return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    // } 
    // // // FIREBASE AUTHENTICATION ENDS HERE
}
