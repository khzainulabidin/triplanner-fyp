import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import {v4 as uuid} from 'uuid';

const AdminTripsTable = ({row, labelId}) => {
    return(
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={uuid()}
        >
            <TableCell padding="checkbox"/>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.source}
            </TableCell>
            <TableCell align="right">{row.destination}</TableCell>
            <TableCell align="right">{row.details}</TableCell>
            <TableCell align="right">{row.deleteTrip}</TableCell>
        </TableRow>
    );
}

export default AdminTripsTable;
