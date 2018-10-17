import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 10,
  },
});

function PaperSheet(props) {
  const { classes, submit } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <AppBar position="static" color="default">
            Add new job listing
        </AppBar>
            <form onSubmit={submit}>
                <label htmlFor="sel1">Work Type </label>
                <select className="form" id="sel1">
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                </select>
                <br />
            </form>
      </Paper>
    </div>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
