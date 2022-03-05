import { TableRow } from "@mui/material";

const CustomTableBodyRow = ({ children }) => {
    return (
        <TableRow role="row" className="odd">
            {children}
        </TableRow>
    )
}

export default CustomTableBodyRow;