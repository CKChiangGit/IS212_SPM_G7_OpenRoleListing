import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../hooks/useSortableTable";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";


const PageControlButton = ({ direction, onClick }) => {
    const icon = direction === "left" ? <AiOutlineArrowLeft/> : <AiOutlineArrowRight/>;
    return (
      <button className="" onClick={onClick}>
        {icon}
      </button>
    );
  };
  
const PageControl = ({ pageNumber, setPageNumber, pageLimit }) => {
const handleIncreasePageNumber = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, pageLimit));
};

const handleDecreasePageNumber = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
};

return (
    <div className="page-size-controls">
    <PageControlButton direction="left" onClick={handleDecreasePageNumber} />
    <span className="page-size-label">{pageNumber}</span>
    <PageControlButton direction="right" onClick={handleIncreasePageNumber} />
    </div>
);
};

// export default function Table({ caption, data, columns, pageNumber, pageSize, setPageNumber}) {
export default function Table({ caption, data, columns, pageSize}) {
    console.log("data received is "+ data + " and pageSizeLimit received is "+ pageSize)   
    const [tableData, handleSorting] = useSortableTable(data, columns);

    // table controls
    const [pageNumber, setPageNumber] = useState(1);
    const pageLimit = Math.ceil(tableData.length / pageSize);
    // console.log(pageNumber + "/" + pageLimit + " and pageSizeLimit is "+ pageSize)

        return (
            <>
                <div class="table-container">
                    <table className="table">
                        <caption>{caption}</caption>
                        <TableHead {...{ columns, handleSorting }} />
                        <TableBody {...{ columns, tableData, pageNumber, pageSize }} />
                    </table>
                </div>
                <PageControl {...{ pageNumber, setPageNumber, pageLimit }} />
            </>

    );
};

