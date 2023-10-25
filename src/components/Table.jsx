import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../hooks/useSortableTable";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";


const PageControlButton = ({ direction, onClick, pageNumber, pageLimit }) => {
        const icon = direction === "left" ? <BsFillArrowLeftCircleFill/> : <BsFillArrowRightCircleFill/>;
        function getCellColor(direction, pageNumber, pageLimit) {
            if (direction === "left") {
              return pageNumber > 1 ? "#3377cc" : "#e7cfd6";
            } else {
              return pageNumber < pageLimit ? "#3377cc" : "#e7cfd6";
            }
        }
          
        return (
            <button className="arrow_button text-6xl" onClick={onClick} style={{
                left:  direction === "left" ? "-20px" : "20px",
                color: getCellColor(direction, pageNumber, pageLimit)
            }}>
                {icon}
            </button>
        );
    };
  
const PageControl = ({ pageNumber, setPageNumber, pageLimit }) => {
    console.log("PageControl " + pageLimit)
    const handleIncreasePageNumber = () => {
        setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, pageLimit));
    };

    const handleDecreasePageNumber = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    };

    return (
        <div className="page-size-controls mt-3">
            <PageControlButton direction="left" onClick={handleDecreasePageNumber} pageNumber={pageNumber} pageLimit={pageLimit}/>
            <span className="page-size-label">{pageNumber}</span>
            <PageControlButton direction="right" onClick={handleIncreasePageNumber} pageNumber={pageNumber} pageLimit={pageLimit} />
        </div>
    );
};

// export default function Table({ caption, data, columns, pageNumber, pageSize, setPageNumber}) {
export default function Table({ caption, data, columns, pageSize, type}) {
    console.log("data received is "+ JSON.stringify(data) + " and pageSizeLimit received is "+ pageSize)   
    const [tableData, handleSorting] = useSortableTable(data, columns);

    // table controls
    const [pageNumber, setPageNumber] = useState(1);
    const pageLimit = Math.ceil(tableData.length / pageSize);
    // console.log(pageNumber + "/" + pageLimit + " and pageSizeLimit is "+ pageSize)

            return (
                <div>
                    
                    <div className="table-container">
                        <div className="centre">
                            <caption>{caption}</caption>
                        </div>
                        
                        <table className="table">
                            
                            <TableHead {...{ columns, handleSorting }} />
                            <TableBody {...{ columns, tableData, pageNumber, pageSize, type}} />
                        </table>
                    </div>
                    <PageControl {...{ pageNumber, setPageNumber, pageLimit }} />
                </div>

        );
};

