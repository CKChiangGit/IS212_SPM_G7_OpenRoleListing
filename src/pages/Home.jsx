import { React, useState, useEffect } from 'react'
import Table from "../components/Table";
// import tableData1 from "../tableData1.json";
import Popup from '../components/Popup';
import { viewRole } from '../hooks/AuthContext';
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


    return (
        <div>
            {token ? (
                
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
                    
                    {tableData.length > 0 ? (
                        <><Table
                            caption="Open roles available for applications."
                            data={tableData}
                            columns={columns}
                            pageSize={3}
                            type="apply" /><Popup role={{
                                "name": 1,
                                "description": "Wendall Gripton",
                            }} /></>
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
