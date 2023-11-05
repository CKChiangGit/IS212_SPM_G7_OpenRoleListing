import React, { useState } from "react";
import moment from "moment";
import { BsCalendar3WeekFill } from "react-icons/bs";
import Table from "../components/Table";
import hardTableData from "../tableData3.json";
import { RiArrowGoBackFill } from "react-icons/ri";

const Popup = ({ role, type_name }) => {
    const togglePopup = () => {
        localStorage.removeItem('staff_edit'); 
        window.dispatchEvent(new Event("edit_event"));
    };
    // set type
    const [type, setType] = useState(type_name);

// table data 
const [tableData, setTableData] = useState(hardTableData);
console.log("hardTableData", tableData);

// table columns for staff
const staff_columns = [
    { label: 'Full Name', accessor: 'fname', sortable: true, sortbyOrder: 'desc' },
    { label: 'Department', accessor: 'dept', sortable: true },
    { label: 'Email', accessor: 'email', sortable: true },
    { label: 'Skill Match', accessor: 'email', sortable: true },
];

const handleCheck = (row) => {
    // find the index of the row in tableData
    const index = tableData.findIndex(data => data.id === row.id);

    // create a new array with the updated row
    const newTableData = [...tableData];
    newTableData[index] = {
        ...newTableData[index],
        checked: !newTableData[index].checked
    };

    // update the state
    setTableData(newTableData);
};

 // toggle for details and skills editing
 const [mode, setMode] = useState("approve");

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
                        <div className="">Skills Required: {role.skills}</div>

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
                                <button className={`w-full max-w-[200px] rounded-md p-5 bg-blue-600 text-white text-center font-semibold shadow-md hover:bg-blue-800 transition duration-150 ease-in-out hover:shadow-lg`}>
                                    APPLY NOW
                                </button>
                            </div>
                        ) : (
                            <div className="flex mt-2 flex-col items-center justify-center w-full">
                                
                                <div className="flex flex-row">
                                    <button
                                        type="button"
                                        id="type"
                                        value="details"
                                        onClick={() => setMode("reject")}
                                        className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                        mode === "approve"
                                            ? "bg-white text-black"
                                            : "bg-slate-600 text-zinc-500" 
                                        }`}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        type="button"
                                        id="type"
                                        value="skills"
                                        onClick={() => setMode("approve")}
                                        className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                                        mode !== "approve"
                                            ? "bg-white text-black"
                                            : "bg-slate-600 text-zinc-500"
                                        }`}
                                    >
                                        Reject
                                    </button>
                                </div>
                                <div className="caption mt-2">Select applicants to {mode}</div>
                                
                            </div>
                        )}
                        
                    </div>
                    
                    
                </div>
                    {type === "apply" ? (
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