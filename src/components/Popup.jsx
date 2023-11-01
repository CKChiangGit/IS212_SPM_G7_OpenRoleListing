import React, { useState } from "react";
import moment from "moment";
import { BsCalendar3WeekFill } from "react-icons/bs";
import Table from "../components/Table";
import tableData from "../tableData3.json";
import { RiArrowGoBackFill } from "react-icons/ri";

const Popup = ({ role }) => {
  const togglePopup = () => {
    localStorage.removeItem('staff_edit'); 
    window.dispatchEvent(new Event("edit_event"));
  };

// table data
const columns = [
    { label: 'Full Name', accessor: 'fname', sortable: true, sortbyOrder: 'desc' },
    { label: 'Department', accessor: 'dept', sortable: true },
    { label: 'Email', accessor: 'email', sortable: true },
    { label: 'Skill Match', accessor: 'email', sortable: true },
];

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
                <div className="flex flex-col md:flex-row ">
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

                    </div>
                    <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden">
                        
                        {/* <div className="m-4 flex flex-col md:flex-row ">
                            
                            <div className="flex flex-col w-[30vw] max-w-[250px]">
                                <div className="truncated">
                                    Chiang Kheng Hean Siang Crystsl Chiang Wai
                                </div>  
                                <div className="max-w-[300px] truncated">
                                    jack.sim.2@all-in-one.com.sg
                                </div> 
                            </div>

                            <div className="flex items-center">
                                <p className=" bg-[#3377cc] w-50 max-w-[200px] rounded-md p-1 ml-3 text-white  font-semibold shadow-md">
                                    <div className="ml-3">50%</div> 
                                </p>
                            </div>
                        </div> */}
                      
                    </div>
                    
                </div>
                <Table
                    caption=""
                    data={tableData}
                    columns={columns}
                    pageSize={6}
                    type="" 
                />
            </div>
        </div>
    </div>
  );
};

export default Popup;