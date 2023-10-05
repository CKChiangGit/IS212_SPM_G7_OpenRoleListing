import { React, useEffect, useState }  from 'react'
import {useLocation, useNavigate} from "react-router-dom"

// import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default function Header() {
    const location = useLocation()
    // console.log(location.pathname)

    const navigate = useNavigate()

    const [ pageState, setPageState ] = useState("Login") 

    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken)[0] : null;
    // console.log(JSON.stringify(token))

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


    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-0'>
            <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
                <div>
                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="logo" className='h-5 cursor-pointer' onClick={()=>navigate('/')}/>
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
                        <li className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px] ${
                            pathMatchRoute("/register") ? "text-black border-b-red-500" : "text-gray-400 border-b-transparent"
                        }`} onClick={()=>navigate('/register')}>
                            Register
                        </li>
                        
                    </ul>
                </div>
            </header>
        </div>
    )
}


