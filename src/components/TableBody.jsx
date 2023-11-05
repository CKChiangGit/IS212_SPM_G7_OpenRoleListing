import { useNavigate } from "react-router-dom";
import Moment from 'react-moment';
import moment from "moment";

const TableBody = ({ tableData, columns, pageNumber, pageSize, type}) => {
    // console.log("received " + pageNumber + " and " + pageSize)
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataToDisplay = tableData.slice(startIndex, endIndex);
    
    const navigate = useNavigate()

    const handleClick = (data) => {
        if (type === "edit" || type === "show") {
            // // alert("show dashboard of staff")
            // alert("set local storage 'staff' to row data clicked")
            localStorage.setItem("staff_edit", JSON.stringify(data))
            window.dispatchEvent(new Event("edit_event"));
            // navigate('/')
        } else if (type === "apply") {
            // alert("show open role details")
            localStorage.setItem("staff_edit", JSON.stringify(data))
            window.dispatchEvent(new Event("edit_event"));
        } else {
            console.log("clicked")
            // append row data clicked to local storage 'selected_staff''
            let selected_staff = JSON.parse(localStorage.getItem('selected_staff')) || [];
            if (data) {
                alert(data)
                selected_staff.push(JSON.stringify(data));
                localStorage.setItem("selected_staff", selected_staff);
            } else {
                console.error('Data is undefined');
            }
            // selected_staff.push(data);
            // localStorage.setItem("selected_staff", JSON.stringify(selected_staff))
        }
    }
    // if type === edit, then show all columns
    if (type === "edit") {
        return (
            <tbody>
                {dataToDisplay.map((data, index) => {
                return (
                    <tr key={index} className="table-row" onClick={() => handleClick(data)}>
                        {columns.map(({ accessor }) => {
                        const tData = data[accessor] ? data[accessor] : "——";
                        return (<td key={accessor}>{tData}</td>)
                        })}
                    </tr>
                    );
                })}
            </tbody>
        )
    } else if (type === "apply") {
        // if type === apply, then alter the date time formats and add Moments components
        return (
            <tbody>
            {dataToDisplay.map((data, index) => {
                return (
                    <tr key={index} className="table-row" onClick={() => handleClick(data)}>
                        {columns.map(({ accessor }) => {
                        const tData = data[accessor] ? data[accessor] : "——";
                        // return (<td key={accessor}>{tData}</td>)
                        return (
                            <td key={accessor}>
                                {accessor === "role_listing_open" ? (
                                    <>
                                        {moment.utc(tData).format("DD/MM/YY")}
                                        <Moment
                                        className="relative bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg moment"
                                        fromNow
                                        style={{ left: "20px" }}
                                        >
                                        {moment.utc(tData)}
                                        </Moment>
                                    </>
                                ) : accessor === "role_listing_close" ? (
                                    <>
                                        {moment.utc(tData).format("DD/MM/YY")}
                                        <Moment
                                        className="relative bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg moment"
                                        fromNow
                                        style={{ left: "20px" }}
                                        >
                                        {moment.utc(tData)}
                                        </Moment>
                                    </>
                                ) : (
                                    tData
                                )}
                            </td>
                        );
                            
                        })}
                    </tr>
                );
            })}
            </tbody>
        
        )
    } else {
        return (
            <tbody>
                {dataToDisplay.map((data, index) => {
                return (
                    <tr key={index} className="table-row" onClick={() => handleClick(data)}>
                        {columns.map(({ accessor }) => {
                        const tData = data[accessor] ? data[accessor] : "——";
                        
                        return (
                            <td key={accessor} style={{ height: "2rem" }}>
                                {accessor === "fname" ? (
                                    <>
                                        {data["fname"] + " " + data["lname"]}
                                    </>
                                ) : accessor === "lname" ? (
                                    null
                                ) : (
                                    tData
                                )}
                            </td>
                        );

                        })}
                    </tr>
                    );
                })}
            </tbody>
        )
    }
};

export default TableBody;