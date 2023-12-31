import React, { useState, useEffect } from "react";
import moment from "moment";
import { BsCalendar3WeekFill } from "react-icons/bs";
import Table from "../components/Table";
// import hardTableData from "../tableData3.json";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { createRoleApplication, getApplicationStatusHR, getAllUser, updateRoleApplication } from '../hooks/AuthContext';
const jwt = require('jsonwebtoken');


const Popup = ({ role, type_name }) => {
    const togglePopup = () => {
        localStorage.removeItem('staff_edit'); 
        window.dispatchEvent(new Event("edit_event"));
    };
    // set type
    const [type, setType] = useState(type_name);

    // table columns for staff
    const staff_columns = [
        { label: 'Full Name', accessor: 'fname', sortable: true, sortbyOrder: 'desc' },
        { label: 'Department', accessor: 'dept', sortable: true },
        { label: 'Email', accessor: 'email', sortable: true },
        { label: 'Status', accessor: 'role_app_status', sortable: true },
    ];

    // toggle for details and skills editing
    const [mode, setMode] = useState("accepted");

    //  get applicants from selected_staff local storage
    let [applicants, setApplicants] = useState(JSON.parse(localStorage.getItem('selected_staff')) || []);

    // update browser whenever selected_staff is updated using useEffect
    const selected_staff = localStorage.getItem('selected_staff');
    useEffect(() => {
        let selectedStaff = JSON.parse(localStorage.getItem('selected_staff')) || [];
        // merge both fname and lname into full_name
        let updatedApplicants = selectedStaff.map(item => ({
            ...item,
            full_name: item.fname + " " + item.lname
        }));
        setApplicants(updatedApplicants);
        console.log("applicants", updatedApplicants);
    }, [selected_staff]); // dependency array

    // clear applicants when popup is closed
    useEffect(() => {
        return () => {
            localStorage.removeItem('selected_staff'); 
        };
    }, []);

    // // get login token    
    const [token, setToken] = useState(null);
    const jwt_token = localStorage.getItem('jwt_token');
    const secret = 'mysecretkey';
    useEffect(() => {
        if (jwt_token !== null) {
            const decodedToken = jwt.verify(jwt_token, secret);
            setToken(decodedToken);
            console.log("decoded " + JSON.stringify(decodedToken));
        } else {
            setToken()
        }
    }, [jwt_token, secret]);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    // apply role function
    const apply_role = async () => {
        // alert("apply_role event detected");
        try {
            console.log("100", token.staff_id, JSON.stringify(role.role_listing_id))
            // role_app_id, role_listing_id, staff_id
            const seed = Date.now();
            const randomNumber = getRandomInt(1, 99999)
            const apply_response = await createRoleApplication(randomNumber, role.role_listing_id, token.staff_id)
            // alert("apply_response " + JSON.stringify(apply_response))
            toast.success("Role successfully applied.");
        } catch (error) {
            console.error(error);
            toast.error("Could not apply for the role." + error.message);
        }
    };

    // get application status
    // const [applicationStatus, setApplicationStatus] = useState([]);
    const [tableData, setTableData] = useState([]);


    const [role_applicants, setRoleApplicants] = useState([]);
    const [user_data, setUserData] = useState([]);

    // First useEffect for fetching data
    useEffect(() => {
        const getApplicationStatus = async () => {
            if (token === null) return;
            try {
                console.log("token ", token)
                const response = await getApplicationStatusHR(token.staff_id);
                console.log("applicationStatus", response);
                if (response && response.roleApplications) {
                    console.log("role.role_listing_id", role.role_listing_id, response.roleApplications)
                    const role_applicants = response.roleApplications.filter(item => item.role_listing_id === role.role_listing_id);
                    setRoleApplicants(role_applicants);

                    // get applicant details from getAllUser
                    const allUsers = await getAllUser();
                    const user_data = allUsers.data
                    console.log("user_data", user_data);
                    console.log("user_data type", typeof user_data);
                    setUserData(user_data);
                }
                
            } catch (error) {
                console.error(error);
            }
        };
        getApplicationStatus();
    }, [token, role]);

    // Second useEffect for updating table data
    useEffect(() => {
        if (user_data.length === 0 || role_applicants.length === 0) return;
        // add applicant details from user_data array to role_applicants that match staff_id
        const updatedTableData = role_applicants.map(item => {
            const user = user_data.staff_details.find(user => user.staff_id === item.staff_id);
            return {
                ...item,
                ...user
            }
        });

        // console.log("updatedTableData", updatedTableData);
        setTableData(updatedTableData);
        
        console.log("TableData", updatedTableData);
    }, [user_data, role_applicants]);

    function iterateApplicants() {
        // iterate through applicants and update role application
        applicants.forEach(applicant => {
            updateRoleApplication(applicant.role_app_id, mode)
        });
    }

  return (
    <div>
        <div className="flex justify-center m-6" cursor="pointer"
            onClick={togglePopup}>
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
      
        <div className="popup">
            <div className="popup-content m-4 max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
                <div className="flex flex-col md:flex-row h-full justify-center items-center">
                    <div className="w-full">
                        <p className="text-2xl font-bold mb-1 text-blue-900">
                            {role.role_listing_desc}
                        </p>
                        <div className="flex justify-start items-center space-x-4 w-[75%]">
                            
                            <BsCalendar3WeekFill className="text-6xl" style={{ color: "#3377cc" }}/>
                            <p className="mr-2">From </p> 
                            <p className={`w-full max-w-[200px] ${new Date(role.role_listing_close) < new Date() ? 'bg-green-800' : 'bg-[#3377cc]'} rounded-md p-1 text-white text-center font-semibold shadow-md`}>
                                {moment.utc(role.role_listing_open).format("DD/MM/YY")}
                            </p>
                            <p className="mr-2">To </p> 
                            <p className={`w-full max-w-[200px] ${new Date(role.role_listing_close) < new Date() ? 'bg-green-800' : 'bg-[#3377cc]'} rounded-md p-1 text-white text-center font-semibold shadow-md`}>
                                {moment.utc(role.role_listing_close).format("DD/MM/YY")}
                            </p>
                        </div>
                        <p className="flex items-center font-bold">
                            <div className="">Open Role ID: {role.role_listing_id}</div>   
                        </p>
                        <div className="">Creator: {role.role_listing_creator}</div>
                        <div className="">Updater: {role.role_listing_updater}</div>
                        <div className="">Date Created: {moment.utc(role.role_listing_ts_create).format("DD/MM/YY HH:MM a")}</div>
                        <div className="pb-4">Date Updated: {moment.utc(role.role_listing_ts_update).format("DD/MM/YY HH:MM a")}</div>
                        <div className="mb-6">
                            <div>
                                <b>Description: </b> {role.role_details_desc.role_description}
                            </div>
                            <br></br>
                            <div>
                                <b>Skills: </b> {role.role_details_desc.role_skills.join(", ")}
                            </div>
                        </div>
                        {/* <div className="">Description : {role.role_details_desc}</div> */}
                        {/* <div className="">Skills Required: {role.role_details_desc.role_skills}</div> */}

                    </div>
                    <div className="flex justify-center items-center space-x-4 w-full h-full">
                            
                        {type !== "view_applicant" ? (
                            <div className="m-4 flex flex-col items-center justify-center w-full">
                                <p className="flex items-center font-bold">
                                    Skill Match (%): {role.skill_match}
                                </p>
                                
                                <br></br>
                                {/* Application Status:  <p className={`w-full max-w-[200px] ${new Date(role.role_listing_close) < new Date() ? 'bg-green-800' : 'bg-[#3377cc]'} rounded-md p-1 text-white text-center font-semibold shadow-md`}>
                                    Applied
                                </p>
                                <br /> */}
                                <button 
                                    className={`w-full max-w-[200px] rounded-md p-5 bg-blue-600 text-white text-center font-semibold shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg`} 
                                    onClick={apply_role}
                                >
                                    APPLY NOW
                                </button>
                            </div>
                        ) : (
                            <div className="flex mt-2 flex-col items-center justify-center w-full">
                                
                                <div className="flex flex-row ">
                                    <button
                                        type="button"
                                        id="type"
                                        value="details"
                                        onClick={() => setMode("accepted")}
                                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                        mode === "accepted"
                                            ? "bg-white text-black"
                                            : "bg-slate-600 text-zinc-500" 
                                        }`}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        type="button"
                                        id="type"
                                        value="skills"
                                        onClick={() => setMode("reject")}
                                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                        mode !== "accepted"
                                            ? "bg-white text-black"
                                            : "bg-slate-600 text-zinc-500"
                                        }`}
                                    >
                                        Reject
                                    </button>
                                </div>
                                <div className="caption mt-4">Selected applicants to {mode}</div>

                                <button 
                                    className={`w-full max-w-[200px] rounded-md p-5 bg-blue-600 text-white text-center font-semibold shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg`} 
                                    onClick={() => iterateApplicants()}
                                >
                                    APPLY NOW
                                </button>
                                <div className="caption max-h-40 w-full flex justify-center overflow-auto">
                                    
                                    {applicants.length === 0 ? (
                                        "No applicants selected"
                                    ) : (
                                        <div className="w-full flex justify-center overflow-auto ">
                                            <div>
                                                {applicants.map(applicant => `${applicant.fname} ${applicant.lname}`).join(', ')}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                
                            </div>
                        )}
                        
                    </div>
                    
                    
                </div>
                    {type === "apply" || !tableData || tableData.length === 0 ? (
                        ""
                    ) : (
                        <Table
                            caption=""
                            data={tableData}
                            columns={staff_columns}
                            pageSize={6}
                            type="" 
                        />
                    )}
                    
                
            </div>
        </div>
    </div>
  );
};

export default Popup;