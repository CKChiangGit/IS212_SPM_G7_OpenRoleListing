import { React, useEffect, useState } from 'react'
import { Outlet, Navigate } from "react-router-dom"
// import { AuthContext } from '../hooks/AuthContext';
// import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute() {
    // SQL AUTHENTICATION START HERE
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken)[0] : null;
    console.log("checking token:" + JSON.stringify(token))
    
    return token ? <Outlet /> : <Navigate to="/login" />;
    // SQL AUTHENTICATION ENDS HERE

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
