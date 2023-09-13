import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { useSortableTable } from "../hooks/useSortableTable";

export default function Table({ caption, data, columns }) {
    console.log("data received is "+ data)   
    const [tableData, handleSorting] = useSortableTable(data, columns);

    return (
        <>
        <table className="table">
            <caption>{caption}</caption>
            <TableHead {...{ columns, handleSorting }} />
            <TableBody {...{ columns, tableData }} />
        </table>
        </>
    );
};

