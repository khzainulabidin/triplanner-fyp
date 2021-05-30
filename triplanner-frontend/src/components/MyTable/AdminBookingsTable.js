import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import {v4 as uuid} from 'uuid';

const AdminBookingsTable = ({row, labelId}) => {
    return(
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={uuid()}
        >
            <TableCell padding="checkbox"/>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.hotel}</TableCell>
            <TableCell align="right">{row.checkin}</TableCell>
            <TableCell align="right">{row.status}</TableCell>
            <TableCell align="right">{row.details}</TableCell>
        </TableRow>
    );
}

export default AdminBookingsTable;
