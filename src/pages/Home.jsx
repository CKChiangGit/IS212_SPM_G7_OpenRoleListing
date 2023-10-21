import { React, useState, useEffect } from 'react'
import Table from "../components/Table";
import tableData1 from "../tableData1.json";
import Popup from '../components/Popup';
import { AuthContext } from '../hooks/AuthContext';
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
    // const data1 = storedToken ? JSON.parse(storedToken)[0] : null;
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

    return (
        <div>
            {token ? (
                <div>
                    {Object.entries(token).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
                    <div className="">Home</div>
                    <Table
                        caption="Developers currently enrolled in this course. The table below is ordered (descending) by the Gender column."
                        data={tableData1}
                        columns={columns}
                        pageSize={3}
                    />
                    <Popup role={{
                        "name": 1,
                        "description": "Wendall Gripton",
                    }}/>
                </div>
            ) : (
                <div>
                <p>You are not authenticated.</p>
                </div>
            )}

        </div>
    )
}
