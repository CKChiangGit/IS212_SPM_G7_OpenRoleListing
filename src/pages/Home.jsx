import { React } from 'react'
import Table from "../components/Table";
import tableData1 from "../tableData1.json";


// table data
const columns = [
    { label: "Full Name", accessor: "full_name", sortable: true },
    { label: "Email", accessor: "email", sortable: true },
    { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
    { label: "Age", accessor: "age", sortable: true },
    { label: "Start date", accessor: "start_date", sortable: true },
];

export default function Home() {     
    const storedToken = localStorage.getItem('token');
    const token = storedToken ? JSON.parse(storedToken)[0] : null;
    // console.log(JSON.stringify(token))

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
                </div>
            ) : (
                <div>
                <p>You are not authenticated.</pay>
                </div>
            )}

        </div>
    )
}
