import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

const TouristBookingsTable = ({row, labelId}) => {
    return(
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.hotel}
        >
            <TableCell padding="checkbox"/>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.hotel}
            </TableCell>
            <TableCell align="right">{row.city}</TableCell>
            <TableCell align="right">{row.checkin}</TableCell>
            <TableCell align="right">{row.status}</TableCell>
            <TableCell align="right">{row.details}</TableCell>
        </TableRow>
    );
}

export default TouristBookingsTable;
