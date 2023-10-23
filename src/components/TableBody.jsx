import { useNavigate } from "react-router-dom";

const TableBody = ({ tableData, columns, pageNumber, pageSize, type}) => {
    // console.log("received " + pageNumber + " and " + pageSize)
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataToDisplay = tableData.slice(startIndex, endIndex);
    
    const navigate = useNavigate()

    const handleClick = (data) => {
        if (type === "edit") {
            // alert("show dashboard of staff")
            // console.log("set local storage 'staff' to row data clicked")
            localStorage.setItem("staff_edit", JSON.stringify(data))
            window.dispatchEvent(new Event("staff_edit"));
            // navigate('/')
        } else if (type === "apply") {
            alert("show open role details")
            window.dispatchEvent(new Event("role_details"));
        } else {
            console.log("clicked")
            // navigate('/staff_edit')
        }
    }

    return (
        <tbody>
        {dataToDisplay.map((data) => {
            return (
                <tr className="table-row" onClick={() => handleClick(data)}>
                    {columns.map(({ accessor }) => {
                    const tData = data[accessor] ? data[accessor] : "——";
                    return <td key={accessor}>{tData}</td>;
                    })}
                </tr>
            );
        })}
        </tbody>
    );
    };

export default TableBody;