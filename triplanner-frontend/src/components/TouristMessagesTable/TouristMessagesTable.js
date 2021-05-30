import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import React from "react";

const TouristMessagesTable = ({row, labelId}) => {
    return(
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.sentAt}
        >
            <TableCell padding="checkbox"/>
            <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.message}</TableCell>
            <TableCell align="right">{row.sentAt}</TableCell>
        </TableRow>
    );
}

export default TouristMessagesTable;
