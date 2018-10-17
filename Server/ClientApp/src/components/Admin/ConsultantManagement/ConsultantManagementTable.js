import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
};

let data = [];

function handleEdit(handleEdit) {
  handleEdit = !handleEdit;
  return handleEdit;
}


const ConsultantManagementTable = (props) => {
  const { classes } = props;
  data = props.data;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Consultant Id</TableCell>
            <TableCell>Consultant Name</TableCell>
            <TableCell>Consultant Description</TableCell>
            <TableCell>Is Approved</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(n => (
              <TableRow key={n.consultantId}>
                <TableCell component="th" scope="row">
                  {n.consultantId}
                </TableCell>
                <TableCell><TextField key={n.consultantId} type="text" value={n.firstName} disabled={n.isDisabled} onChange={(e) => props.handleChange(n, e, 'ConsultantName')}/></TableCell>
                <TableCell><TextField key={n.consultantId} type="text" value={n.consultantDesc} disabled={n.isDisabled} onChange={(e) => props.handleChange(n, e, 'description')} /></TableCell>
                <TableCell><Checkbox checked={(n.isApproved === 1) ? true : false} disabled={n.isDisabled} onChange={(e) => props.handleIsApproved(n, e, 'isApproved')} /></TableCell>
                <TableCell>

                  <IconButton
                    aria-label="Edit"
                    onClick={() => {
                    if (n.isDisabled) {
                      n.isDisabled = !n.isDisabled;
                      props.handleEdit(data);
                    } else {
                      n.isDisabled = !n.isDisabled;
                      props.handleSave(n);
                    }
                  }
                }
                  >

                    {n.isDisabled ? <EditIcon /> : <SaveIcon />}
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={(e) => props.handleDelete(n.id,e)}>
                  <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

ConsultantManagementTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConsultantManagementTable);
