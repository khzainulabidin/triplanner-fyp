import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

const AdminUsersTable = ({row, labelId}) => {
    return(
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.username}
        >
            <TableCell padding="checkbox"/>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.username}
            </TableCell>
            <TableCell align="right">{row.type}</TableCell>
            <TableCell align="right">{row.status}</TableCell>
            <TableCell align="right">{row.ban}</TableCell>
            <TableCell align="right">{row.view}</TableCell>
        </TableRow>
    );
}

export default AdminUsersTable;
