import { React, useContext, useEffect, useState }  from 'react'
import { useLocation, useNavigate} from "react-router-dom"
import { AuthContext } from '../hooks/AuthContext';
import logo from '../images/Logo.png';
const jwt = require('jsonwebtoken');

// import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Header() {
    const location = useLocation()
    // console.log(location.pathname)

    const navigate = useNavigate()

    const [ pageState, setPageState ] = useState("Login") 

    // // get login token    
    const [token, setToken] = useState(null);
    const jwt_token = localStorage.getItem('jwt_token');
    const secret = 'mysecretkey';
    useEffect(() => {
    if (jwt_token !== null) {
        const decodedToken = jwt.verify(jwt_token, secret);
        setToken(decodedToken);
        console.log("decoded " + JSON.stringify(decodedToken));
    } else {
        setToken()
    }
    }, [jwt_token, secret]);
    
    console.log("token " + JSON.stringify(token))
    useEffect(() => {
        if (token) {
            setPageState("Profile")
        } else {
            setPageState("Login")
        }
    }, [token])
    // // FIREBASE AUTHENTICATION STARTS HERE
    // const auth = getAuth()
    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             setPageState("Profile")
    //         } else {
    //             setPageState("Login")
    //         }
    //     })
    // }, [auth])
    // // FIREBASE AUTHENTICATION ENDS HERE

    // checks if the current URL (location.pathname) is route
    function pathMatchRoute(route){
        if (route === location.pathname){
            return true
        }
    }

    // get log out function from AuthContext
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        console.log("logging out")
        logout();
        navigate('/');
        window.location.reload(); // clear local cache
    };

    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-0'>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div style={{ position:'relative'}}>
                    <img src={logo} alt="logo" style={{ height: '20%', width: '20%'}} className='h-5 cursor-pointer' onClick={()=>navigate('/')}/>
                </div>
                <div>
                    <ul className="flex space-x-10">
                        <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                            pathMatchRoute("/") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
                        }`} onClick={() => navigate("/")}>
                            Home
                        </li>

                        {/* Since the user will be moved to /login if he's not already logged in when going to /profile, the main path is /profile */}
                        <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                            (pathMatchRoute("/profile") || pathMatchRoute("/login")) ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
                        }`} onClick={()=>navigate('/profile')}>
                            {pageState}
                        </li>

                        {token && token.sys_role === "hr" && (
                            <li className={`w-24 cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/staff_creation") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
                            }`} onClick={()=>navigate('/staff_creation')}>
                                Register Staff
                            </li>
                        )}
                        {token && token.sys_role === "hr" && (
                            <li className={`w-16 cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                                pathMatchRoute("/staff_edit") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
                            }`} onClick={()=>navigate('/staff_edit')}>
                                Edit Staff
                            </li>
                        )}

                        {pageState === "Profile" && (
                             <li className={`w-16 cursor-pointer py-3 text-sm font-semibold border-b-[3px] text-gray-400 border-b-transparent`} onClick={handleLogout}>
                                Log Out
                            </li>
                        )}
                       
                        
                    </ul>
                </div>
            </header>
        </div>
    )
}


