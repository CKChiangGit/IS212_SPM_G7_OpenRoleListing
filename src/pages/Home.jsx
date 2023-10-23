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

    const columns = [
        { label: 'Role ID', accessor: 'role_listing_id', sortable: true, sortbyOrder: 'desc' },
        { label: 'Role Name', accessor: 'role_listing_desc', sortable: true },
        { label: 'Role Source', accessor: 'role_listing_source', sortable: true },
        { label: 'Role Open Date', accessor: 'role_listing_open', sortable: true },
        { label: 'Role Close Date', accessor: 'role_listing_close', sortable: true },
        { label: 'Role Creator', accessor: 'role_listing_creator', sortable: true },
        { label: 'Role Updater', accessor: 'role_listing_updater', sortable: true },
        { label: 'Role Create Date', accessor: 'role_listing_ts_create', sortable: true },
        { label: 'Role Update Date', accessor: 'role_listing_ts_update', sortable: true },
    ];
    
    // update table data with viewRole() and setTableData()
    const [tableData, setTableData] = useState([])

    const updateTableData = async (data) => {
        try {
            // const data = JSON.parse(await viewRole());
            // const response = await fetch('http://localhost:3003/openroles');
            // const data2 = await response.json();
            // const data = JSON.parse([{"role_listing_id":531,"role_id":27431,"role_listing_desc":"Technology Consultant","role_listing_source":2049,"role_listing_open":"2023-09-20","role_listing_close":"2023-10-04","role_listing_creator":8857,"role_listing_updater":8857,"role_listing_ts_create":"2023-09-25T12:07:09.000Z","role_listing_ts_update":"2023-09-25T12:07:09.000Z"},{"role_listing_id":532,"role_id":27432,"role_listing_desc":"Technology Advisor","role_listing_source":2049,"role_listing_open":"2023-09-20","role_listing_close":"2023-10-31","role_listing_creator":8857,"role_listing_updater":8857,"role_listing_ts_create":"2023-09-25T12:07:10.000Z","role_listing_ts_update":"2023-09-25T12:07:10.000Z"}])
            // console.log("retrieved " + JSON.stringify(data))
            // console.log("retrieved " + typeof data)
            // // compare if data2 and data are the same
            // if (JSON.stringify(data2) === JSON.stringify(data)) {
            //     console.log("same")
            // } 
            setTableData(data);
            console.log("table data updated")
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        
        const data = [
            {
              "role_listing_id": 531,
              "role_id": 27431,
              "role_listing_desc": "Technology Consultant",
              "role_listing_source": 2049,
              "role_listing_open": "2023-09-20",
              "role_listing_close": "2023-10-04",
              "role_listing_creator": 8857,
              "role_listing_updater": 8857,
              "role_listing_ts_create": "2023-09-25T12:07:09.000Z",
              "role_listing_ts_update": "2023-09-25T12:07:09.000Z"
            },
            {
                "role_listing_id": 532,
                "role_id": 27432,
                "role_listing_desc": "Technology Advisor",
                "role_listing_source": 2049,
                "role_listing_open": "2023-09-20",
                "role_listing_close": "2023-10-31",
                "role_listing_creator": 8857,
                "role_listing_updater": 8857,
                "role_listing_ts_create": "2023-09-25T12:07:10.000Z",
                "role_listing_ts_update": "2023-09-25T12:07:10.000Z"
              }
          ];
        updateTableData(data);
    }, []);
    console.log(tableData)

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch('http://localhost:3003/openroles');
        const data = await response.json();
        setData(data);
        };

        fetchData();
    }, []);

    return (
        <div>
            {token ? (
                
                <div>
                    <thead>
                  <tr>
                    <th>role_listing_id</th>
                    <th>role_id</th>
                    <th>role_listing_desc</th>
                    <th>role_listing_source</th>
                    <th>role_listing_open</th>
                    <th>role_listing_close</th>
                    <th>role_listing_creator</th>
                    <th>role_listing_updater</th>
                    <th>role_listing_ts_create</th>
                    <th>role_listing_ts_update</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.role_listing_id}>
                      <td>{item.role_listing_id}</td>
                      <td>{item.role_id}</td>
                      <td>{item.role_listing_desc}</td>
                      <td>{item.role_listing_source}</td>
                      <td>{item.role_listing_open}</td>
                      <td>{item.role_listing_close}</td>
                      <td>{item.role_listing_creator}</td>
                      <td>{item.role_listing_updater}</td>
                      <td>{item.role_listing_ts_create}</td>
                      <td>{item.role_listing_ts_update}</td>
                      <td>
                        <button onClick={() => {
                          const roleId = item.role_id;
                          window.location.href = `view_role.html?role_id=${roleId}`;
                        }}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                    {Object.entries(token).map(([key, value]) => (
                        <p key={key}>
                            {key}: {value}
                        </p>
                    ))}
                    <div className="">Home</div>
                    <Table
                        caption="Open roles available for applications."
                        data={tableData}
                        columns={columns}
                        pageSize={3}
                        type="apply"
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
