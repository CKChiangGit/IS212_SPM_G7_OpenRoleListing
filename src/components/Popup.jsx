import React, { useState } from "react";
import moment from "moment";
import { BsCalendar3WeekFill } from "react-icons/bs";

const Popup = ({ role }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

//   {"role_listing_id":531,"role_id":27431,"role_listing_desc":"Technology Consultant","role_listing_source":2049,"role_listing_open":"2023-09-20","role_listing_close":"2023-10-04","role_listing_creator":8857,"role_listing_updater":8857,"role_listing_ts_create":"2023-09-25T12:07:09.000Z","role_listing_ts_update":"2023-09-25T12:07:09.000Z"}

  return (
    <div>
      <button onClick={togglePopup}>View Details</button>
      {showPopup && (
        <div className="popup">
            <div className="popup-content">

                <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
                    <div className="w-full">
                        <p className="text-2xl font-bold mb-3 text-blue-900">
                            {role.role_listing_desc}
                        </p>
                        <div className="flex justify-start items-center space-x-4 w-[75%]">
                            <BsCalendar3WeekFill className="text-6xl" style={{ color: "#3377cc" }}/>
                            <p className="bg-[#3377cc] w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">
                                {moment.utc(role.role_listing_open).format("DD/MM/YY")}
                            </p>
                            
                            <p className={`w-full max-w-[200px] ${new Date(role.role_listing_close) < new Date() ? 'bg-green-800' : 'bg-[#3377cc]'} rounded-md p-1 text-white text-center font-semibold shadow-md`}>
                                {moment.utc(role.role_listing_close).format("DD/MM/YY")}
                            </p>
                        </div>
                        <p className="flex items-center mb-3 font-semibold">
                            <div className="">{role.role_listing_id}</div>   
                        </p>
                        <div className="">{role.role_listing_creator}</div>
                        <div className="">{role.role_listing_updater}</div>
                        <div className="">{role.role_listing_ts_create}</div>
                        <div className="">{role.role_listing_ts_update}</div>

                    </div>
                    <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
                </div>
                <button onClick={togglePopup}>Exit</button>
                <button>Confirm</button>    
            </div>
        </div>
      )}
    </div>
  );
};

export default Popup;