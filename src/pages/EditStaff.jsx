import React from 'react'
import { useEffect, useState, useContext } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
// import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { db } from "../firebase"
// import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// // SQL AUTHENTICATION START HERE
import { createUser } from '../hooks/AuthContext';
import { AuthContext, editUser } from '../hooks/AuthContext';
import Table from "../components/Table";
import tableData from "../tableData3.json";

export default function EditStaff() {
    const navigate = useNavigate()

    // get login token from local storage
    const storedToken = localStorage.getItem('token');
    // const token = storedToken ? JSON.parse(storedToken)[0] : null;
    // const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')) || {});
    const [token, setToken] = useState(storedToken ? JSON.parse(storedToken)[0] : null);

    console.log(JSON.stringify(token))

    // check if token is valid
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout();
        navigate('/');
      };

    const [formData, setFormData] = useState({
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

        // // testing data 
        // fname: "JOHN asd",
        // lname: "SIM",
        // dept: "MANAGEMENT",
        // email: "jack.sim.2@all-in-one.com.sg",
        // phone: "87821918",
        // biz_address: "65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065",
        // sys_role: "hr",
        // pw: "345345",
    })
    
    
    const {staff_id, name, fname, lname, dept, email, phone, biz_address, sys_role, pw} = formData

    // // table data
    // {"staff_id":1,"fname":"JOHN","lname":"SIM","dept":"MANAGEMENT","email":"john.sim.1@all-in-one.com.sg","phone":"87821918","biz_address":"65 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409065","sys_role":"inactive","pw":"123123"}
        const columns = [
        { label: "Staff ID", accessor: "staff_id", sortable: true},
        { label: "First Name", accessor: "fname", sortable: true },
        { label: "Last Name", accessor: "lname", sortable: true },
        { label: "Department", accessor: "dept", sortable: true, sortbyOrder: "desc" },
        { label: "Email", accessor: "email", sortable: true },
        { label: "Phone", accessor: "phone", sortable: true },
        { label: "Business Address", accessor: "biz_address", sortable: true },
        { label: "System Role", accessor: "sys_role", sortable: true },
        { label: "Password", accessor: "pw", sortable: true },
    ];
    console.log(tableData)
    // const columns = [
    //     { label: "Full Name", accessor: "full_name", sortable: true },
    //     { label: "Email", accessor: "email", sortable: false },
    //     { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
    //     { label: "Age", accessor: "age", sortable: true },
    //     { label: "Start date", accessor: "start_date", sortable: true },
    // ];

    // for changing personal profile
    const [changeDetail, setChangeDetail] = useState(false);
    function onChange(e) {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
    }
    async function onSubmit() {
        try {
            console.log(fname, lname)
            if (fname !== "" && lname !== "") {
                // send post data to backend '/staff_details/:id'
                console.log("sending "+ staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw)
                const token = await editUser(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw);
                toast.success("Profile details updated");
                // update user profile
                const updatedToken = [{ ...formData, name: fname + " " + lname }];
                setToken(updatedToken);
                localStorage.setItem('token', JSON.stringify(updatedToken));
                if (!token) {
                    console.log("token not found")
                    handleLogout()
                }
                // update name in formData
                setFormData((prevState) => ({
                    ...prevState,
                    name: fname + " " + lname,
                }));
            }
        } catch (error) {
            toast.error("Could not update the profile details" + error.message);
        }
        
    }

    useEffect(() => {
        // // Set the overflow property of the body and html elements to hidden
        // document.body.style.overflow = 'hidden';
        // document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
    
      }, []);

    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Edit User
            </h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-4 max-w-7xl mx-auto"  >
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-4">
                {/* <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-4"> */}
                    <Table
                        caption="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
                        data={tableData}
                        columns={columns}
                        pageSize={3}
                        // pageNumber={pageNumber}
                        // pageSize={pageSize}
                        // setPageNumber={setPageNumber}
                    />
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={onSubmit}>
                        <p className="text-lg mt-6 font-semibold">Staff ID</p>
                        <input 
                            className='mb-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="number" 
                            id="staff_id" 
                            value={staff_id} 
                            onChange={onChange} 
                            placeholder="ID Number"
                        />
                        <p className="text-lg font-semibold">Staff Name</p>
                        <div className="mb-4 w-full flex justify-between ">
                            <div className="">
                                <input 
                                    className="mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                                    type="text" 
                                    id="fname" 
                                    value={fname} 
                                    onChange={onChange} 
                                    placeholder="First Name"
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
                                />
                            </div>
                        </div>
                        <p className="text-lg font-semibold">Department</p>
                        <input 
                            className='mb-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="text" 
                            id="dept" 
                            value={dept} 
                            onChange={onChange} 
                            placeholder="Department"
                        />
                        <p className="text-lg font-semibold">Email Address</p>
                        <input 
                            className='mb-4 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={onChange} 
                            placeholder="Email"
                        />
                        <p className="text-lg font-semibold">Phone Number</p>
                        <div className="relative mb-4">
                            <input 
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                type="tel"
                                id="phone" 
                                value={phone} 
                                onChange={onChange} 
                                placeholder="Phone"
                            />
                        </div>
                        <p className="text-lg font-semibold">Business Address</p>
                        <div className="relative mb-4">
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
                        <div className="relative mb-4">
                            <input 
                                className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                                type="text"
                                id="sys_role" 
                                value={sys_role} 
                                onChange={onChange} 
                                placeholder="Role"
                            />
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
