import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

let id = 0;
function createData(email, username, firstname, lastname, phoneNo) {
  id += 1;
  return {
    id, email, username, firstname, lastname, phoneNo,
  };
}
let data = [];



function UserManagementTable(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>PhoneNumber</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(n => (
            <TableRow key={n.id}>
              <TableCell component="th" scope="row">
                {n.email}
              </TableCell>
              <TableCell>{n.userName}</TableCell>
              <TableCell>{n.firstName}</TableCell>
              <TableCell>{n.lastName}</TableCell>
              <TableCell>{n.phoneNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

UserManagementTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserManagementTable);
