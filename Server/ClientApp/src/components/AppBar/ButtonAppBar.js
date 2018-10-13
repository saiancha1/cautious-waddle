import React from 'react';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SummerTech from '../SummerTech/SummerTech';
import AddJob from '../AddJob/AddJob';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function ButtonAppBar(props) {
  const { classes, children } = props;
  console.log(children);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Route exact path="/summerTech" component={SummerTech} />
        <Route exact path="/addjob" component={AddJob} />
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {children}
          </Typography>
            <Button component={Link} to="/addJob" variant="contained" color="primary" className={classes.button}>
                Add Listing
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);