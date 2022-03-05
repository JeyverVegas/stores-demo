import { TableCell } from "@mui/material";

const CustomTableHeadColumn = ({ style, children, className, tabIndex, ariaControls, rowSpan, colSpan, ariaLabel, ...rest }) => {
    return (
        <TableCell

            className={`sorting ${className}`}
            tabIndex={tabIndex ? tabIndex : 0}
            aria-controls={ariaControls}
            rowSpan={rowSpan ? rowSpan : 1}
            colSpan={colSpan ? colSpan : 1}
            aria-label={ariaLabel}
            style={style}
        >
            {children}
        </TableCell>
    )
}

export default CustomTableHeadColumn;