import React from 'react'
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { getAuth, updateProfile } from "firebase/auth";
// import { collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore"
// import { db } from "../firebase"
import ListingItem from "../components/ListingItem";
import Table from "../components/Table";
import tableData from "../tableData1.json";
import { RiChatNewFill } from "react-icons/ri";
import { authenticateUser, AuthContext, editUser, viewRole } from '../hooks/AuthContext';
import Popup from '../components/Popup';
import { toast } from "react-toastify";
const jwt = require('jsonwebtoken');

export default function Profile() {
    const navigate = useNavigate()
    
    // // get login token    
    const jwt_token = localStorage.getItem('jwt_token');
    const secret = 'mysecretkey';
    const decodedToken = jwt.verify(jwt_token, secret);
    const [token, setToken] = useState(decodedToken);
    console.log("decoded " + JSON.stringify(decodedToken));

    // check if token is valid
    const { logout } = useContext(AuthContext);
    const handleLogout = () => {
        console.log("logging out")
        logout();
        navigate('/');
      };

    console.log("token " + JSON.stringify(token))
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
    
    // table data
    const columns = [
        { label: 'Role ID', accessor: 'role_listing_id', sortable: true, sortbyOrder: 'desc' },
        { label: 'Role Name', accessor: 'role_listing_desc', sortable: true, sortbyOrder: 'desc' },
        { label: 'Role Source', accessor: 'role_listing_source', sortable: true },
        { label: 'Role Open Date', accessor: 'role_listing_open', sortable: true },
        { label: 'Role Close Date', accessor: 'role_listing_close', sortable: true },
        { label: 'Role Creator', accessor: 'role_listing_creator', sortable: true },
        { label: 'Role Updater', accessor: 'role_listing_updater', sortable: true },
        { label: 'Role Create Date', accessor: 'role_listing_ts_create', sortable: true },
        { label: 'Role Update Date', accessor: 'role_listing_ts_update', sortable: true },
    ];

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
            if(Object.values(formData).every((val) => val !== '')) {
            // if (fname !== "" && lname !== "") {
                // send post data to backend '/staff_details/:id'
                console.log("sending "+ [staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw])
                const token = await editUser(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw);
                toast.success("Profile details updated");

                // update user profile
                // const updatedToken = { ...formData, name: fname + " " + lname };
                authenticateUser(email, pw);
                // localStorage.setItem('token', JSON.stringify(updatedToken));
                // if (!token) {
                //     console.log("token not found")
                //     handleLogout()
                // }
                // update name in formData
                setFormData((prevState) => ({
                    ...prevState,
                    name: fname + " " + lname,
                }));
            }
        } catch (error) {
            toast.error("Could not update the profile details. " + error.message);
        }
        
    }

    // update table data with viewRole() and setTableData()
    const [tableData, setTableData] = useState([])
    const updateTableData = async () => {
        try {            
            setTableData(await viewRole());
            console.log("table data updated")
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        updateTableData();
    }, []);
    console.log("table is " + JSON.stringify(tableData))
    return (
        <div>
            <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                <h1 className='text-3xl text-center mt-6 font-bold'>
                    Profile
                </h1>
                <div className="w-full md:w-[50%] mt-6 px-3">
                    <form action="">
                        {/* name input */}
                        <label className="w-full">
                            Username
                            {!changeDetail ? (

                                    <input type="text" 
                                        id="name" 
                                        value={name}
                                        disabled 
                                        className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                                    />

                            ) : (
                                <div className="mb-6 w-full flex justify-between ">
                                    <div className="">
                                        <input 
                                            className="mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out bg-red-200 focus:bg-red-200" 
                                            type="text" 
                                            id="fname" 
                                            value={fname} 
                                            onChange={onChange} 
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="">
                                        <input 
                                            className="mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out bg-red-200 focus:bg-red-200" 
                                            type="text" 
                                            id="lname" 
                                            value={lname} 
                                            onChange={onChange} 
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                            )}
                        </label>

                        {/* email input */}
                        <label className="w-full">
                            Email
                            <input type="email" 
                                id="email"
                                value={email}
                                disabled 
                                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                            />
                        </label>

                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
                            <p className="flex items-center ">
                                Do you want to change your details?
                                <span
                                    onClick={() => {
                                        // if changing details, next click will be onSumbit
                                        changeDetail && onSubmit();
                                        setChangeDetail((prevState) => !prevState);
                                    }}                           
                                    className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                                >
                                {changeDetail ? "Apply" : "Edit"}
                                </span>
                            </p>
                            <p
                                onClick={handleLogout}
                                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
                            >
                                Sign out
                            </p>
                        </div>
                        
                    </form>
                    
                    {token.sys_role === "hr" ? (
                        <button type="submit" className='w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg'>
                            <Link 
                                to="/role_creation"
                                className="flex justify-center items-center"
                            >
                                <RiChatNewFill className="mr-2 text-3xl bg-blue-500 rounded-full p-1 border-2"/>
                                Create role
                            </Link>
                        </button>
                    ) : (
                        // don't show button
                        ""
                    )}
                    
                    
                </div>
            </section>

            <div className="max-w-6xl px-3 mt-6 mx-auto">
                {(token.sys_role === "hr" || token.sys_role === "manager") && tableData ? (
                    <div>
                        {tableData.length > 0 ? (
                            <>
                                <Table
                                    caption="Open roles available for applications."
                                    data={tableData}
                                    columns={columns}
                                    pageSize={3}
                                    type="edit" /><Popup role={{
                                        "name": 1,
                                        "description": "Wendall Gripton",
                                }} />
                            </>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                ) : (
                    // don't show table
                    ""
                )}
            </div>

        </div>
    )
}
