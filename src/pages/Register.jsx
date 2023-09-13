import React from 'react'
import { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase"
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = formData
    const navigate = useNavigate()

    // sets the input element's id to the its value (whatever typed in)
    function onChange(e){
        console.log(e.target.value)
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    // called when register button is clicked 
    async function onSubmit(e) {
        // prevent refreshing on form submit
        e.preventDefault()

        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, {
                displayName: name,
            })
            const user = userCredential.user
            console.log(user)

            // Prep formData for saving. Remove password to avoid hackers getting access
            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            // Save formData to db
            await setDoc(doc(db, "users", user.uid), formDataCopy)
            console.log(name + " has been registered.")
            toast.success("Registration has been registered")

        } catch (error){
            const errorMsg = {
                "Firebase: Error (auth/email-already-in-use).": "Email is already in use.",
                "Firebase: Password should be at least 6 characters.": "Password is too short. Min 6 characters.",
            }
            console.log(error.message)
            toast.error("Registration failed. " + errorMsg[error.message])
        }
    }

    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Register User
            </h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1373&q=80" alt="key" className='w-full rounded-2xl'/>
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={onSubmit}>
                        <input 
                            className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={onChange} 
                            placeholder="Username"
                        />
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
                        
                        <button
                        className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                        type="submit"
                        >
                        Register
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
