import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import CreateRole from "./pages/CreateRole";
import { ToastContainer } from "react-toastify"; // notification app
import "react-toastify/dist/ReactToastify.css"; // notification app css
import { useEffect, useState} from "react";
import { data } from "autoprefixer";
// import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap styling
import axios from 'axios';

function App() {
    // method 1
    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        // const fetchPosts = async () => { 
        //     try { 
        //         const response = await api.get('/api'); 
                
        //     } catch (err) { 
        //         if (err. response) { 
        //         // Not in the 200 response range? 
        //         console. log (err. response. data) ; 
        //         console. log (err. response. status) ; 
        //         console. log( err. response. headers) ; 
        //         } else { 
        //         console. log(`Error: ${err.message}`); 
        //         }
        //     }
        // }
        // fetchPosts();

        // // method 1
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                console.log(data)
            }
        )
    }, [])



    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />

                    {/* Go through PrivateRoute.jsx first before accessing Profile.jsx */}
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="create-role" element={<PrivateRoute />}>
                    <Route path="/create-role" element={<CreateRole />} />
                    </Route>
                </Routes>
            </Router>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            {/* This is just to test if the backend is working */}
            {(typeof backendData.users === 'undefined') ? (
                <p>Loading...</p>
            ): (
                backendData.users.map((user, i) => (
                    <p  key={i}>{user.name}</p>
                ))
            )}
        </>
    );
}

export default App;
