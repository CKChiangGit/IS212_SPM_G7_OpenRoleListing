import React from 'react'
import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { RiChatNewFill } from "react-icons/ri";
import { authenticateUser, AuthContext, editUser, viewRole, viewUserSkill } from '../hooks/AuthContext';
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

    // checks if window is too narrow and changes columns
    const [isMd, setIsMd] = useState(false);
    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 1000px)");
      setIsMd(mediaQuery.matches);
  
      const handleResize = () => {
        setIsMd(mediaQuery.matches);
      };
      mediaQuery.addEventListener("change", handleResize);
      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    }, []);
    if (isMd) {
        columns.splice(0, columns.length, 
            { label: 'Role ID', accessor: 'role_listing_id', sortable: true, sortbyOrder: 'desc' },
        { label: 'Role Name', accessor: 'role_listing_desc', sortable: true, sortbyOrder: 'desc' },
        { label: 'Role Source', accessor: 'role_listing_source', sortable: true },
        );
    }


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
                await editUser(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw);
                toast.success("Profile details updated");

                authenticateUser(email, pw);

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
    // console.log("table is " + JSON.stringify(tableData))

    // update skill data with viewUserSkill() and setSkillData()
    const [skillData, setSkillData] = useState([])
    const updateSkillData = async () => {
        try {            
            setSkillData(await viewUserSkill(staff_id));
            console.log("skill data updated")
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        updateSkillData();
    }, []);

    // update staff_edit token when event detected
    const [role, setRole] = useState(JSON.parse(localStorage.getItem('staff_edit')) || {});

    useEffect(() => {
        const handleStorageChange = () => {
          const newToken = JSON.parse(localStorage.getItem('staff_edit')) || {};
          setRole(newToken);
        //   alert(role ? "role is " + JSON.stringify(role) : "role is empty");
        };
      
        window.addEventListener('edit_event', handleStorageChange);
        return () => {
            window.removeEventListener('edit_event', handleStorageChange);
        }
      }, [role]);

    return (
        <div>
            {Object.keys(role).length === 0 ? (
                <>
                    <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
                        <h1 className='text-3xl text-center mt-6 font-bold'>
                            Profile
                        </h1>
                        <div className="w-full md:w-[50%] mt-6 px-3">
                            <form action="">
                                {/* name input */}
                               
                                    {!changeDetail ? (
                                        <>
                                            <label className="w-full">
                                                Username
                                                <input type="text" 
                                                    id="name" 
                                                    value={name}
                                                    disabled 
                                                    className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                                                />
                                            </label>

                                            <label className="w-full">
                                                Email
                                                <input type="email" 
                                                    id="email"
                                                    value={email}
                                                    disabled 
                                                    className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                                                />
                                            </label>

                                            <label className="w-full">
                                                Department
                                                <input type="text" 
                                                    id="dept"
                                                    value={dept}
                                                    disabled 
                                                    className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                                                />
                                            </label>

                                            <label className="w-full">
                                                Phone Number
                                                <input type="number" 
                                                    id="phone"
                                                    value={phone}
                                                    disabled 
                                                    className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                                                />
                                            </label>

                                            <label className="w-full">
                                                Business Address
                                                <input type="email" 
                                                    id="email"
                                                    value={biz_address}
                                                    disabled 
                                                    className="mb-2 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                                                />
                                            </label>

                                            {/* display skillData as string*/}
                                            <label className="w-full">
                                                Skills
                                                <input type="text" 
                                                    id="email"
                                                    value={skillData?.skill_ids?.join(", ")}
                                                    disabled 
                                                    className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
                                                />
                                            </label>
                                        </>
                                    ) : (
                                        <>
                                            <label className="text-lg font-semibold" htmlFor="fname">Username</label>
                                            <div className="mb-4 w-full flex justify-between ">
                                                    <input 
                                                        className="mr-3 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                                                        type="text" 
                                                        id="fname" 
                                                        value={fname} 
                                                        onChange={onChange} 
                                                        placeholder="First Name"
                                                    />
                                                    <input 
                                                        className=" w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out" 
                                                        type="text" 
                                                        id="lname" 
                                                        value={lname} 
                                                        onChange={onChange} 
                                                        placeholder="Last Name"
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
                                                />
                                            </div>
                                        </>
                                    )}
                                

                                

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
                            
                            {/* Create role button only for HR */}
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
                                            type="show" 
                                        />
                                        
                                            
                                        
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
                </>
                
            ) : (
                <>
                    <h1 className='text-3xl text-center mt-6 font-bold'>
                        Open Role Applicants
                    </h1>
                    <Popup role={role}/>
                </>
            )}
        </div>
    )
}
