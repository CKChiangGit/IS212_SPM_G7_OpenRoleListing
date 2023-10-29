import React from 'react'
import { useContext, useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";

// // SQL AUTHENTICATION 
import { AuthContext, authenticateUser } from '../hooks/AuthContext';
// // // FIREBASE AUTHENTICATION 
// import { signInWithEmailAndPassword, getAuth} from 'firebase/auth';

import { toast } from "react-toastify";

export default function Login() {
    // sets showPassword to false initially
    const [showPassword, setShowPassword] = useState(false);


    // // SQL AUTHENTICATION START HERE
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const { email, password } = formData
    const { login } = useContext(AuthContext);
    const navigate = useNavigate()

    // sets the input element's id to the its value (whatever typed in)
    function onChange(e){
        console.log(e.target.value)
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
  
    const onSubmit = async (e) => {
        e.preventDefault();
        alert("Logging in. " + email)
        try {
            const token = await authenticateUser(email, password);
            login(token);
            console.log("ive logged to " + token)
            // console.log("ive logged to " + JSON.stringify(token))
            navigate("/")
            console.log(token.email)
            toast.success("Logging in. " + token.email)
        } catch (error){
            console.log(error.message)
            toast.error("Login failed. " + error.message)
        }
        
    }
    // // SQL AUTHENTICATION ENDS HERE

    // // FIREBASE AUTHENTICATION START HERE
    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: "",
    // })
    // const { email, password } = formData
    // const navigate = useNavigate()

    // // sets the input element's id to the its value (whatever typed in)
    // function onChange(e){
    //     console.log(e.target.value)
    //     setFormData((prevState)=>({
    //         ...prevState,
    //         [e.target.id]: e.target.value,
    //     }))
    // }

    // // called when register button is clicked 
    // async function onSubmit(e) {
    //     // prevent refreshing on form submit
    //     e.preventDefault()

    //     try {
    //         const auth = getAuth();
    //         const userCredential = await signInWithEmailAndPassword(auth, email, password)
    //         if (userCredential.user) {
    //             navigate("/")
    //             console.log(userCredential.user)
    //             toast.success("Logging in. " + userCredential.user.email)
    //         }
    //     } catch (error){
    //         const errorMsg = {
    //             "Firebase: Error (auth/wrong-password).": "Password is invalid",
    //             "Firebase: Error (auth/user-not-found).": "This email isn't registered",
    //         }
    //         console.log(error.message)
    //         toast.error("Login failed. " + errorMsg[error.message])
    //     }
    // }
    // // FIREBASE AUTHENTICATION ENDS HERE

    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Login
            </h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80" alt="key" className='w-full rounded-2xl'/>
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={onSubmit}>
                        <input 
                            className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={onChange} 
                            placeholder="Email address"
                        />
                        <div className="relative mb-6">
                            <input 
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                type={showPassword ? "text" : "password"}
                                id="password" 
                                value={password} 
                                onChange={onChange} 
                                placeholder="Password"
                            />

                            {/* Toggle password visibility using negation of prevState */}
                            {showPassword ? (
                                <AiFillEyeInvisible 
                                    className='absolute right-3 top-3 text-xl cursor-pointer'
                                    onClick={()=>setShowPassword((prevState)=>!prevState)}
                                />
                            ) : (
                                <AiFillEye
                                    className='absolute right-3 top-3 text-xl cursor-pointer'
                                    onClick={()=>setShowPassword((prevState)=>!prevState)}
                                />
                            )}
                        </div>
                        

                        {/*  */}

                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className="mb-6">
                                Don't have an account?
                                <Link
                                    to="/sign-up"
                                    className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                                >
                                Register
                                </Link>
                            </p>
                            <p>
                                <Link
                                    to="/forgot-password"
                                    className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                                >
                                Forgot password?
                                </Link>
                            </p>
                        </div>
                        <button
                        className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                        type="submit"
                        >
                        Sign in
                        </button>
                        {/* <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                            <p className="text-center font-semibold mx-4">OR</p>
                        </div> */}
                    </form>
                    
                </div>
            </div>
        </section>
    )
}
