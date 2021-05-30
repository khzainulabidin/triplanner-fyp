import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";
import {v4 as uuid} from 'uuid';

const MessagesTable  = ({row, labelId}) => {
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
            <TableCell align="right">{row.email}</TableCell>
            <TableCell align="right">{row.phone}</TableCell>
            <TableCell align="right">{row.message}</TableCell>
            <TableCell align="right">{row.receivedAt}</TableCell>
        </TableRow>
    );
}

export default MessagesTable;
