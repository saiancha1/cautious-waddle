import React from 'react';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import * as Colors from '@material-ui/core/colors';
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
    colorPrimary: 'white',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

//const muiTheme = createMuiTheme({
  //palette: {
    //textColor: Colors.darkBlack,
    //primary1Color: Colors.indigo700,
    //primary2Color: Colors.indigo700,
    //accent1Color: Colors.redA200,
    //pickerHeaderColor: Colors.darkBlack,

 // },
  //appBar: {
    //height: 60, 
  //},
    
//});


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

//used to export styles instead of muiTheme
export default withStyles(styles)(ButtonAppBar);
