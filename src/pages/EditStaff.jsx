import React, { useEffect, useState, useContext } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext, editUser, getAllUser } from '../hooks/AuthContext';
import Table from '../components/Table';
// import tableData from '../tableData3.json';
const jwt = require('jsonwebtoken');

export default function EditStaff() {
    const navigate = useNavigate();

    // // // get login token  
    // const [formData, setFormData] = useState({});
    // const [token, setToken] = useState({});
    // const [changeDetail, setChangeDetail] = useState(false);
    // console.log(JSON.stringify(token))

    // useEffect(() => {
    //     const jwt_token = localStorage.getItem('jwt_token');
    //     const secret = 'mysecretkey';
    //     const decodedToken = jwt.verify(jwt_token, secret);
    //     setToken(decodedToken[0]);
    //     setFormData(decodedToken[0]);
    // }, []);

    // // check if token is valid
    // const { logout } = useContext(AuthContext);
    // const handleLogout = () => {
    //     logout();
    //     navigate('/');
    // };

    // // get staff_edit token
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('staff_edit')) || {});
    console.log(token)

    const [formData, setFormData] = useState({});
    useEffect(() => {setFormData({
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
      
        window.addEventListener('staff_edit', handleStorageChange);
      }, [staffEditValue]);

    const { staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw } = formData;

    const columns = [
        { label: 'Staff ID', accessor: 'staff_id', sortable: true },
        { label: 'First Name', accessor: 'fname', sortable: true },
        { label: 'Last Name', accessor: 'lname', sortable: true },
        { label: 'Department', accessor: 'dept', sortable: true, sortbyOrder: 'desc' },
        { label: 'Email', accessor: 'email', sortable: true },
        { label: 'Phone', accessor: 'phone', sortable: true },
        { label: 'Business Address', accessor: 'biz_address', sortable: true },
        { label: 'System Role', accessor: 'sys_role', sortable: true },
        { label: 'Password', accessor: 'pw', sortable: true },
    ];

    async function onSubmit(e) {
        e.preventDefault();
        try {
            if (fname !== '' && lname !== '') {
                const token = await editUser(staff_id, fname, lname, dept, email, phone, biz_address, sys_role, pw);
                toast.success('Profile details updated');
                updateTableData();
            }
        } catch (error) {
            toast.error('Could not update the profile details. ' + error.message);
        }
    }
    // // set table data
    const [tableData, setTableData] = useState({});
    
    // update table data with getAllUser() and setTableData()
    const updateTableData = async () => {
        try {
            const data = await getAllUser();
            console.log("retrieved " + data)
            setTableData(data);
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

    return (
        <section>
            <h1 className='text-3xl text-center mt-6 font-bold'>
                Edit Staff
            </h1>
            <Table
                caption=""
                data={tableData}
                columns={columns}
                pageSize={5}
                type="edit"
                // pageNumber={pageNumber}
                // pageSize={pageSize}
                // setPageNumber={setPageNumber}
            />
            {token ? (
                <div className="flex justify-center flex-wrap items-center px-6 py-4 max-w-7xl mx-auto"  >
                    <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-4">
                        <div className="flex items-center justify-between mb-4">
                            {/* <h2 className="text-2xl font-semibold">Edit Staff</h2>
                            <button
                                className="text-sm text-gray-600 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                                type="button"
                                onClick={onSubmit}
                            >
                                Change Details
                            </button> */}
                        </div>

                            
                        <div>
                        
                            {Object.entries(token).map(([key, value]) => (
                                <p key={key}>
                                    {key}: {value}
                                </p>
                            ))}
                            
                        </div>
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
                            Update
                            </button>
                            {/* <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                                <p className="text-center font-semibold mx-4">OR</p>
                            </div> */}
                        </form>
                    </div>

                </div>
            ) : (
                <div>
                    <p>Please select a user</p>
                </div>
            )}
        </section>
    )
}
