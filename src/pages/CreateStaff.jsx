import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createUser, getActiveSkills } from '../hooks/AuthContext';
import { on } from 'events';
const jwt = require('jsonwebtoken');

export default function CreateStaff() {
    const [formData, setFormData] = useState({
        staff_id: "9",
        fname: "asd",
        lname: "asd",
        dept: "asd",
        email: "asd@gmail.com",
        phone: "87821918",
        biz_address: "99",
        sys_role: "hr",
        pw: "99",
        staff_skill: [],
    })
    // const [formData, setFormData] = useState({
    //     staff_id: "",
    //     fname: "",
    //     lname: "",
    //     dept: "",
    //     email: "",
    //     phone: "",
    //     biz_address: "",
    //     sys_role: "",
    //     password: "",
    //     staff_skill: [],
    // })
    const { staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw, staff_skill} = formData

    const navigate = useNavigate()

    // // get login token    
    const jwt_token = localStorage.getItem('jwt_token');
    const secret = 'mysecretkey';
    const decodedToken = jwt.verify(jwt_token, secret);
    console.log("decoded: " + JSON.stringify(decodedToken));
    useEffect(() => {
        if (decodedToken.sys_role !== "hr") {
            toast.warning('You are not authorized to view this page');
            navigate('/');
        }
    })

    // updates the form data state onclick
    function onChange(e){
        console.log(e.target.value)
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    const handleSkillChange = (e) => {
        console.log(e.target.value)
        const skillId = e.target.value;
        const isChecked = e.target.checked;

        // Update the staff_skill array based on the checked state of the checkbox
        if (isChecked) {
          setFormData((prevState) => ({
            ...prevState,
            staff_skill: [...prevState.staff_skill, skillId],
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            staff_skill: prevState.staff_skill.filter((id) => id !== skillId),
          }));
        }
      };
      useEffect(() => {
        console.log(formData.staff_skill);
      }, [formData.staff_skill]);

    // retrieve all active skills from async function
    const [skills, setSkills] = useState([]);
    useEffect(() => {
        const getSkills = async () => {
            const activeSkills = await getActiveSkills();
            setSkills(activeSkills.data.skill_details);
            console.log(activeSkills.data.skill_details)
        }
        getSkills();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw)
            console.log("skills " + staff_skill)
            const token = await createUser(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw, staff_skill);
            toast.success("Created staff " + token)
        } catch (error){
            console.log(error.message)
            toast.error("Staff creation failed. " + error.message)
        }
        
    }




    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Register User
            </h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-0 max-w-6xl mx-auto">
                
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 flex justify-center ">
                    <div className="">
                        <h3 className="text-lg font-semibold">Skills</h3>
                        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            
                            {skills.map((skill) => (
                                <li key={skill.skill_name} name="staff_skill" className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center px-3">
                                    <input 
                                        id={`${skill.skill_name}-checkbox`} 
                                        type="checkbox" 
                                        value={skill.skill_id} 
                                        // onClick={() => {console.log(`${skill.skill_name}`)}}
                                        onChange={handleSkillChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    />
                                    
                                    <label htmlFor={`${skill.skill_name}-checkbox`} className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{skill.skill_name}</label>
                                    </div>
                                </li>
                            ))}
                            
                        </ul>
                    </div>

                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:mr-20">
                    <form onSubmit={onSubmit}>
                        <p className="text-lg mt-6 font-semibold">Staff ID</p>
                        <input 
                            className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="number" 
                            id="staff_id" 
                            value={staff_id} 
                            onChange={onChange} 
                            placeholder="ID Number"
                            required
                        />
                        <p className="text-lg font-semibold">Staff Name</p>
                        <div className="mb-6 w-full flex justify-between ">
                            <div className="">
                                <input 
                                    className="mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                                    type="text" 
                                    id="fname" 
                                    value={fname} 
                                    onChange={onChange} 
                                    placeholder="First Name"
                                    required
                                />
                            </div>
                            <div className="">
                                <input 
                                    className="mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                                    type="text" 
                                    id="lname" 
                                    value={lname} 
                                    onChange={onChange} 
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                        </div>
                        <p className="text-lg font-semibold">Department</p>
                        <input 
                            className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="text" 
                            id="dept" 
                            value={dept} 
                            onChange={onChange} 
                            placeholder="Department"
                            required
                        />
                        <p className="text-lg font-semibold">Email Address</p>
                        <input 
                            className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={onChange} 
                            placeholder="Email"
                            required
                        />
                        <p className="text-lg font-semibold">Phone Number</p>
                        <div className="relative mb-6">
                            <input 
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                type="tel"
                                id="phone" 
                                value={phone} 
                                onChange={onChange} 
                                placeholder="Phone"
                                required
                            />
                        </div>
                        <p className="text-lg font-semibold">Business Address</p>
                        <div className="relative mb-6">
                            <input 
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                type="text"
                                id="biz_address" 
                                value={biz_address} 
                                onChange={onChange} 
                                placeholder="Address"
                            />
                        </div>
                        <p className="text-lg font-semibold">Role</p>
                        <div className="relative mb-6">
                            <select 
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                id="sys_role" 
                                name={sys_role} 
                                onChange={onChange} 
                                required
                            >
                                <option value="hr">HR</option>
                                <option value="manager">Manager</option>
                                <option value="staff">Staff</option>
                            </select>
                        </div>
                        <p className="text-lg font-semibold">Password</p>
                        <div className="relative mb-6">
                            <input 
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                type="text"
                                id="pw" 
                                value={pw} 
                                onChange={onChange} 
                                placeholder="Password"
                                required
                            />
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
