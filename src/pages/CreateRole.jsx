import React from 'react'
import { useEffect, useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // for making http requests to ConnectionManager.js
import { toast } from "react-toastify";
import { getActiveSkills, createListing } from '../hooks/AuthContext';
const jwt = require('jsonwebtoken');

export default function CreateRole() {

    // // get login token    
    const jwt_token = localStorage.getItem('jwt_token');
    const secret = 'mysecretkey';
    const decodedToken = jwt.verify(jwt_token, secret);
    console.log("decoded: " + JSON.stringify(decodedToken));

    const [formData, setFormData] = useState({
        // role_id: "",
        // role_listing_id: "",
        // role_name: "",
        // role_description: "",
        // role_status: "",
        // role_listing_source: "",
        // role_listing_open: "",
        // role_listing_close: "",
        // role_listing_creator: decodedToken.staff_id,
        // role_listing_updater: decodedToken.staff_id,
        // staff_skill: [],

        // create dummy data for testing
        role_id: "100",
        role_name: "test",
        role_description: "test",
        role_status: "active",
        role_listing_id: "100",
        role_listing_source: "2049", // manager_id
        role_listing_open: "2021-08-01",
        role_listing_close: "2024-08-01",
        role_listing_creator: decodedToken.staff_id,
        role_listing_updater: decodedToken.staff_id,
        staff_skill: ["6", "10"],

      });

    const {
        role_id,
        role_listing_id,
        role_name,
        role_description,
        role_status,
        role_listing_source,
        role_listing_open,
        role_listing_close,
        role_listing_creator,
        role_listing_updater,
        staff_skill,
        
    } = formData;

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

    // updates the form data state onclick
    function onChange(e){
        console.log(e.target.value)
        setFormData((prevState)=>({
            ...prevState,
            // if target id is role_description, then set the same value for role_description and role_listing_desc
            [e.target.id]: e.target.id === "role_description" ? 
                {role_description: e.target.value, role_listing_desc: e.target.value} :
                // else, set the value of the target id to the target value
                {[e.target.id]: e.target.value}
        }))
    }
    
    // send data to backend
    const config = {
        baseURL: 'http://localhost:3004',
    };

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            // console log json stringify testData
            console.log(JSON.stringify(formData))
            const response = await createListing(formData)
            toast.success("Created role " + response)
            console.log(response.data);
        } catch (error) {
            console.error(`Error creating new role listing`); // this is the error
            toast.error("Role listing creation failed. " + error.message)

        }
    }

    const navigate = useNavigate();

    

    return (
        <main className="">
            <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
            <div className="flex justify-center m-6" cursor="pointer"
                onClick={() => navigate('/profile')}>
                <RiArrowGoBackFill
                    className="text-3xl mr-3 font-bold text-gray-600 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                    type="button"
                    cursor="pointer"
                />             
                <button
                    className="text-xl font-bold text-gray-600 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                    type="button"
                >
                    Go Back
                </button>
                
            </div>
            <div className="flex justify-center flex-wrap items-center px-6 py-0 max-w-6xl mx-auto">
                    
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 flex justify-center ">
                    <div className="">
                        <h3 className="text-lg font-semibold">Skills Needed</h3>
                        <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            
                            {skills.map((skill) => (
                                <li key={skill.skill_name} name="staff_skill" className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div className="flex items-center px-3">
                                    <input 
                                        id={`${skill.skill_name}-checkbox`} 
                                        type="checkbox" 
                                        value={skill.skill_id} 
                                        // onClick={() => {console.log(`${skill.skill_name}`)}}
                                        onClick={handleSkillChange}
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
                    <form>
                        <p className="text-lg mt-6 font-semibold">Manager ID</p>
                        <input
                            type="number"
                            id="role_id"
                            value={role_listing_source}
                            onChange={onChange}
                            placeholder="ID"
                            maxLength="32"
                            minLength="4"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                        <p className="text-lg mt-6 font-semibold">Role Details ID</p>
                        <input
                            type="number"
                            id="role_id"
                            value={role_id}
                            onChange={onChange}
                            placeholder="ID"
                            maxLength="32"
                            minLength="4"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                        <p className="text-lg mt-6 font-semibold">Role Listing ID</p>
                        <input
                            type="number"
                            id="role_listing_id"
                            value={role_listing_id}
                            onChange={onChange}
                            placeholder="ID"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                        <p className="text-lg mt-6 font-semibold">Role Name</p>
                        <input
                            type="text"
                            id="role_name"
                            value={role_name}
                            onChange={onChange}
                            placeholder="Name"
                            maxLength="50"
                            minLength="4"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                        <p className="text-lg mt-6 font-semibold">Role Description</p>
                        <textarea
                            type="text"
                            id="role_description"
                            value={role_description}
                            onChange={onChange}
                            placeholder="Description"
                            maxLength="50000"
                            minLength="4"
                            required
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                        />
                        <p className="text-lg mt-6 font-semibold">Role Status</p>
                        <select 
                            className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            id="role_status" 
                            value={role_status} 
                            onChange={onChange} 
                            required
                        >   
                            <option value="" disabled selected hidden>Choose a status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            
                        </select>
                        

                        <div className="flex w-full justify-between">
                            <div className="">
                                <p className="text-lg mt-6 font-semibold">From</p>
                                <input
                                    type="date"
                                    id="role_listing_open"
                                    value={role_listing_open}
                                    onChange={onChange}
                                    className="mr-3 px-7 py-3 text-gray-700 bg-white border border-gray-300 font-medium text-sm uppercase rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                                />
                            </div>
                            <div className="">
                                <p className="text-lg mt-6 font-semibold">Till</p>
                                <input
                                    type="date"
                                    id="role_listing_close"
                                    value={role_listing_close}
                                    onChange={onChange}
                                    className="mr-3 px-7 py-3  text-gray-700 bg-white border border-gray-300 font-medium text-sm uppercase rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full"
                                />
                            </div>
                        </div>

                    </form>
                    <button
                        type="submit"
                        className="my-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={handleSubmit}>
                        Create Role
                    </button>
                </div>
                
                
            </div>
        </main>
    )
}
