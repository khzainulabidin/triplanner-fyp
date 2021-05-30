import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

const TouristReviewsTable = ({row, labelId}) => {
    return(
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.name}
        >
            <TableCell padding="checkbox"/>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.rating}</TableCell>
            <TableCell align="right">{row.details}</TableCell>
        </TableRow>
    );
}

export default TouristReviewsTable;
