import { useNavigate } from "react-router-dom";

const TableBody = ({ tableData, columns, pageNumber, pageSize, type}) => {
    // console.log("received " + pageNumber + " and " + pageSize)
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataToDisplay = tableData.slice(startIndex, endIndex);
    
    const navigate = useNavigate()

    const handleClick = () => {
        if (type === "staff") {
            alert("show dashboard of staff")
            console.log("show dashboard of staff")
            // render show dashboard component of staff visible
            // navigate('/')
        } else {
            console.log("clicked")
            // navigate('/staff_edit')
        }
    }

    return (
        <tbody>
        {dataToDisplay.map((data) => {
            return (
                <tr key={data.id} className="table-row" onClick={handleClick}>
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