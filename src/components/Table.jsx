import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../hooks/useSortableTable";

const PageControlButton = ({ direction, onClick }) => {
    const icon = direction === "up" ? "▲" : "▼";
    return (
      <button className="" onClick={onClick}>
        {icon}
      </button>
    );
  };
  
  const PageControl = ({ pageNumber, setPageNumber }) => {
    const handleIncreasePageNumber = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };
  
    const handleDecreasePageNumber = () => {
        setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    };
  
    return (
      <div className="page-size-controls">
        <PageControlButton direction="up" onClick={handleIncreasePageNumber} />
        <span className="page-size-label">{pageNumber}</span>
        <PageControlButton direction="down" onClick={handleDecreasePageNumber} />
      </div>
    );
  };

export default function Table({ caption, data, columns, pageNumber, pageSize, setPageNumber}) {
    console.log("data received is "+ data)   
    const [tableData, handleSorting] = useSortableTable(data, columns);

    return (
        <>
        <table className="table">
            <caption>{caption}</caption>
            <TableHead {...{ columns, handleSorting }} />
            <TableBody {...{ columns, tableData, pageNumber, pageSize }} />
        </table>
        <PageControl {...{ pageNumber, setPageNumber }} />
        </>
    );
};

