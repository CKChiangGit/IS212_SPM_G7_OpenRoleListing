import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify"; // notification app
import "react-toastify/dist/ReactToastify.css"; // notification app css


function App() {
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
    </>
  );
}

export default App;