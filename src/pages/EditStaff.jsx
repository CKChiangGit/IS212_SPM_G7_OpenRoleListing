import React, { useEffect, useState, useContext } from 'react';
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authenticateUser, editUser, getAllUser, getActiveSkills } from '../hooks/AuthContext';
import Table from '../components/Table';

const jwt = require('jsonwebtoken');

export default function EditStaff() {
    const navigate = useNavigate();

    // // Get or Create staff_edit token
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('staff_edit')) || {});
    console.log(token)

    const [formData, setFormData] = useState({});
    useEffect(() => {
        setFormData({
            staff_id: token.staff_id,
            name: token.fname + " " + token.lname,
            fname: token.fname,
            lname: token.lname,
            email: token.email,
            dept: token.dept,
            phone: token.phone,
            biz_address: token.biz_address,
            sys_role: token.sys_role,
            pw: token.pw,
            staff_skill: token.staff_skill || []
        });
    }, [token]);

    // update staff_edit token when localStorage changes
    const staffEditValue = localStorage.getItem('staff_edit');
    useEffect(() => {
        const handleStorageChange = () => {
          const newToken = JSON.parse(localStorage.getItem('staff_edit')) || {};
          setToken(newToken);
          console.log("updated " + newToken);
        };
      
        window.addEventListener('edit_event', handleStorageChange);
        return () => {
            window.removeEventListener('edit_event', handleStorageChange);
        }
      }, [staffEditValue]);

    const { staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw, staff_skill } = formData;

    const columns = [
        { label: 'Staff ID', accessor: 'staff_id', sortable: true },
        { label: 'Full Name', accessor: 'fname', sortable: true },
        // { label: 'Last Name', accessor: 'lname', sortable: true },
        { label: 'Department', accessor: 'dept', sortable: true, sortbyOrder: 'desc' },
        { label: 'Email', accessor: 'email', sortable: true },
        { label: 'Phone', accessor: 'phone', sortable: true },
        { label: 'Business Address', accessor: 'biz_address', sortable: true },
        { label: 'System Role', accessor: 'sys_role', sortable: true },
        { label: 'Password', accessor: 'pw', sortable: true },
    ];

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

    async function onSubmit(e) {
        e.preventDefault();
        try {
            // check if all formData is not null
            if(Object.values(formData).every((val) => val !== '')) {
                // // check if HR edited own profile
                // console.log("comparing ", token.staff_id, decodedToken.staff_id)
                // console.log(token.staff_id === decodedToken.staff_id)
                const editOwnProfile = token.staff_id === decodedToken.staff_id;

                console.log(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw, staff_skill, decodedToken.staff_id);
                await editUser(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw, staff_skill, decodedToken.staff_id);
                toast.success('Profile details updated');
                updateTableData();
                setType("details");
    
                // reauthenticate if HR edited own profile
                if (editOwnProfile) {
                    try {
                        await authenticateUser(email, pw);
                        console.log("jwt has been resigned");
                        // setToken({}); 
                        // localStorage.removeItem('staff_edit'); 
                    } catch (error) {
                      console.log("Error during authentication:", error);
                    }
                } 
                setToken({}); 
                localStorage.removeItem('staff_edit');
                // navigate('/staff_edit');
                
            }
        } catch (error) {
            console.log(error);
            toast.error('Error updating profile details');
        }
    }

    const [tableData, setTableData] = useState([])
    
    // update table data with getAllUser() and setTableData()
    const updateTableData = async () => {
        try {
            const data = await getAllUser();
            console.log("retrieved " + JSON.stringify(data.data.staff_details))
            setTableData(data.data.staff_details);
        } catch (error) {
          console.error(error);
        }
      };
    useEffect(() => {
        updateTableData();
    }, []);

    function onChange(e) {
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
        }));
    }

    // toggle for details and skills editing
    const [type, setType] = useState("details");

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

    // handle checkbox change for staff_skill
    const handleSkillChange = (e) => {
        console.log(e.target.value)
        const skillId = e.target.value;
        const isChecked = e.target.checked;

        // Update the staff_skill array based on the checked state of the checkbox
        if (isChecked) {
          setFormData((prevState) => ({
            ...prevState,
            staff_skill: [...prevState.staff_skill, {skill_id: parseInt(skillId)}],
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            staff_skill: prevState.staff_skill.filter((id) => id.skill_id !== parseInt(skillId)),
          }));
        }
      };
      useEffect(() => {
        console.log(formData.staff_skill);
      }, [formData.staff_skill]);

    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Edit Staff
            </h1>
            {/* check if token of "staff_edit" is set*/}
            {Object.keys(token).length === 0 ? (
                <div>
                     
                    <Table
                        key={JSON.stringify(tableData)}
                        caption="Please select a user to edit"
                        data={tableData}
                        columns={columns}
                        pageSize={5}
                        type="edit_staff"
                    />
                </div>
            ) : (
                <div className="">
                    <div className="flex justify-center flex-wrap items-center px-6 py-0 max-w-7xl mx-auto"  >
                        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-4 max-h-screen">
                            <div className="flex justify-center mb-6" cursor="pointer"
                                onClick={(token)=> {
                                setToken({}); 
                                localStorage.removeItem('staff_edit'); 
                            }}>
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
                            <div>
                                
                                {Object.entries(token).map(([key, value]) => (
                                    <p key={key}>
                                        {key}: {key === 'staff_skill' ? 
                                            value.length === 0 ? "No skills" : value.map((skill) => (
                                                skill.skill_name
                                            )).join(", ")
                                            : value
                                        }
                                    </p>
                                ))}

                                <div className="flex mt-2">
                                    <button
                                        type="button"
                                        id="type"
                                        value="details"
                                        onClick={() => setType("details")}
                                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                        type === "details"
                                            ? "bg-white text-black"
                                            : "bg-slate-600 text-zinc-500"
                                        }`}
                                    >
                                        details
                                    </button>
                                    <button
                                        type="button"
                                        id="type"
                                        value="skills"
                                        onClick={() => setType("skills")}
                                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                        type === "skills"
                                            ? "bg-white text-black"
                                            : "bg-slate-600 text-zinc-500"
                                        }`}
                                    >
                                        skills
                                    </button>
                                </div>
                                
                            </div>
                        </div>

                        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                            <form className="py-4" onSubmit={onSubmit}>
                                {type === "details" ? (
                                    <>
                                        {/* <label className="flex text-xl w-40 mr-6 font-semibold" htmlFor="staff_id">Staff ID</label>
                                        <div className="flex items-center align-items-center mb-4 ">
                                            <input 
                                                className='flex-1 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out w-full' 
                                                type="number" 
                                                id="staff_id" 
                                                value={staff_id} 
                                                onChange={onChange} 
                                                placeholder="ID Number"
                                                required
                                            />
                                        </div> */}
                                        <label className="text-lg font-semibold" htmlFor="fname">Staff Name</label>
                                        <div className="mb-4 w-full flex justify-between ">
                                                <input 
                                                    className="mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                                                    type="text" 
                                                    id="fname" 
                                                    value={fname} 
                                                    onChange={onChange} 
                                                    placeholder="First Name"
                                                    required
                                                />
                                                <input 
                                                    className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                                                    type="text" 
                                                    id="lname" 
                                                    value={lname} 
                                                    onChange={onChange} 
                                                    placeholder="Last Name"
                                                    required
                                                />
                                        </div>
                                        <label className="flex text-lg w-40 mr-6 font-semibold" htmlFor="dept">Department</label>
                                        <div className="flex items-center align-items-center mb-4 ">
                                            <input 
                                                className='flex-1 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out w-full' 
                                                type="text" 
                                                id="dept" 
                                                value={dept} 
                                                onChange={onChange} 
                                                placeholder="Department"
                                                required
                                            />
                                        </div>
                                        <label className="text-lg font-semibold"  htmlFor="email">Email Address</label>
                                        <input 
                                            className='mb-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                            type="email" 
                                            id="email" 
                                            value={email} 
                                            onChange={onChange} 
                                            placeholder="Email"
                                            required
                                        />
                                        <div className="flex items-center align-items-center mb-4 ">
                                            <label className="flex text-lg w-20 mr-6 font-semibold" htmlFor="phone">Phone</label>
                                            <input 
                                                className='flex-1 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out w-full' 
                                                type="number"
                                                id="phone" 
                                                value={phone} 
                                                onChange={onChange} 
                                                placeholder="Phone"
                                                required
                                            />
                                        </div>
                                        
                                        <label className="text-lg font-semibold">Business Address</label>
                                        <div className="relative mb-4">
                                            <textarea 
                                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                                rows="3" cols="50"
                                                id="biz_address" 
                                                value={biz_address} 
                                                onChange={onChange} 
                                                placeholder="Address"
                                                required
                                            />
                                        </div>
                                        <div className="flex items-center align-items-center mb-4 ">
                                            <label className="flex text-lg w-20 mr-6 font-semibold">Role</label>
                                            <select 
                                                className='flex-1 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out w-full' 
                                                id="sys_role" 
                                                value={sys_role} 
                                                onChange={onChange}
                                                required
                                            >
                                                <option value="staff">Staff</option>
                                                <option value="hr">HR</option>
                                                <option value="manager">Manager</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        
                                        <p className="text-lg font-semibold">Password</p>
                                        <div className="relative mb-4">
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
                                    </>
                                ) : (
                                    <>
                                        <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">

                                            {skills.map((skill) => (
                                                <li key={skill.skill_name} name="staff_skill" className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                                    <div className="flex items-center px-3">
                                                    <input 
                                                        id={`${skill.skill_name}-checkbox`} 
                                                        type="checkbox" 
                                                        value={skill.skill_id} 
                                                        defaultChecked={staff_skill.some(s => s.skill_id === skill.skill_id)}
                                                        onClick={handleSkillChange}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                    />
                                                    
                                                    <label htmlFor={`${skill.skill_name}-checkbox`} className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{skill.skill_name}</label>
                                                    </div>
                                                </li>
                                            ))}
                                            
                                        </ul>
                                    </>
                                )}
                                
                                <button
                                    className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                                    type="submit"
                                >
                                    Update
                                </button>
                                {/* <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                                    <p className="text-center font-semibold mx-4">OR</p>
                                </div> */}
                            </form>
                        </div>

                    </div>
                </div>
                
            )}
        </section>
    )
}
