import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus";

export default function PrivateRoute() {
    // const isLoggedIn = false;
    const { isLoggedIn, checkingStatus, counter} = useAuthStatus();
    console.log("isLoggedIn " + isLoggedIn + counter)
    if (checkingStatus) {
        <h3>Loading...</h3>
    }
    // useAuthStatus usually fails the first time, so run at least twice before checking status
    if (counter === 1) {
        console.log('success')
        // if logged in, go to Outlet (nested Profile.jsx in App.js), else redirect to Login.jsx 
        return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
    } 
}
