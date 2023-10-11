const TableBody = ({ tableData, columns, pageNumber, pageSize }) => {
    // console.log("received " + pageNumber + " and " + pageSize)
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const dataToDisplay = tableData.slice(startIndex, endIndex);
    // console.log(startIndex, endIndex, dataToDisplay)
    return (
        <tbody>
        {dataToDisplay.map((data) => {
            return (
            <tr key={data.id}>
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