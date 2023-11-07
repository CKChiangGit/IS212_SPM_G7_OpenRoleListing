import { React, useState, useEffect } from 'react'
import Table from "../components/Table";
import Popup from '../components/Popup';
import { viewRole, getApplicationStatus } from '../hooks/AuthContext';
const jwt = require('jsonwebtoken');

// table data
const columns = [
    { label: "Full Name", accessor: "full_name", sortable: true },
    { label: "Email", accessor: "email", sortable: true },
    { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
    { label: "Age", accessor: "age", sortable: true },
    { label: "Start date", accessor: "start_date", sortable: true },
];

export default function Home() {     
    // const storedToken = localStorage.getItem('token');
    // const token = storedToken ? JSON.parse(storedToken)[0] : null;
    // console.log(JSON.stringify(token))

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

    const columns = [
        // { label: 'Role ID', accessor: 'role_listing_id', sortable: true, sortbyOrder: 'desc' },
        { label: 'Role Name', accessor: 'role_listing_desc', sortable: true, sortbyOrder: 'desc' },
        // { label: 'Role Source', accessor: 'role_listing_source', sortable: true },
        { label: 'Role Open Date', accessor: 'role_listing_open', sortable: true },
        { label: 'Role Close Date', accessor: 'role_listing_close', sortable: true },
        // { label: 'Role Creator', accessor: 'role_listing_creator', sortable: true },
        // { label: 'Role Updater', accessor: 'role_listing_updater', sortable: true },
        // { label: 'Role Create Date', accessor: 'role_listing_ts_create', sortable: true },
        // { label: 'Role Update Date', accessor: 'role_listing_ts_update', sortable: true },
        { label: 'Skill Match %', accessor: 'skill_match', sortable: true },
    ];

    const applyColumns = [
        { label: 'Role Name', accessor: 'role_listing_desc', sortable: true, sortbyOrder: 'desc' },
        { label: 'Application Status', accessor: 'application_status', sortable: true },
    ];
    
    // update table data with viewRole() and setTableData()
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const updateTableData = async () => {
            if (!token) {
                console.log("Token is not set yet");
                return;
            }
        
            try {            
                const data = await viewRole(token.staff_id);
                setTableData(data);
                console.log("table data updated")
            } catch (error) {
                console.error(error);
            }
        };
    
        updateTableData();
    }, [token]);


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
    
    
    // update application table data
    const [applyData, setApplyData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const updateApplyData = async () => {
            if (!token) {
                console.log("Token is not set yet");
                return;
            }
        
            try {            
                const data = await getApplicationStatus(token.staff_id);
                setApplyData(data.roleApplicationList);
                console.log("application data updated", data);
                setIsLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error(error);
                setIsLoading(false); // Also set loading to false if there's an error
            }
        };
    
        window.addEventListener('edit_event', updateApplyData);
        return () => {
            window.removeEventListener('edit_event', updateApplyData);
        }
    }, [token]);

    return (
        <div>
            {token ? (
                
                <div className='mt-2'>

                    {/* {Object.entries(token).map(([key, value]) => (
                        <p key={key}>
                        {key}: {key === 'staff_skill' ? 
                            value.length === 0 ? "No skills" : value.map((skill) => (
                                skill.skill_name
                            )).join(", ")
                            : value
                        }
                    </p>
                    ))} */}
                    {applyData.length > 0 && !isLoading ? (
                        <div className='mb-12'>
                            <Table
                            caption="Your role applications."
                            data={applyData}
                            columns={applyColumns}
                            pageSize={3}
                            type="" />
                            
                            
                        </div>
                        
                    ) : (
                        
                        <div className="mb-12">
                            <div className='flex justify-center caption '>You've not applied for any roles</div>
                        </div>
                    )}
                    
                    {tableData.length > 0 ? (
                        <>
                            {Object.keys(role).length === 0. ? (
                                <Table
                                caption="Open roles available for applications."
                                data={tableData}
                                columns={columns}
                                pageSize={3}
                                type="apply" />
                            ) : (
                                <Popup role={role} type_name="apply"/>
                            )}
                            {/* <Popup role={role} type_name="apply"/> */}
                            
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            ) : (
                <div className="flex justify-center">
                    <div>
                        <p>You are not authenticated.</p>
                    </div>
                </div>
                
            )}

        </div>
    )
}
