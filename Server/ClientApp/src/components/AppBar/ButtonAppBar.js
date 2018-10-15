import React from 'react';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import * as Colors from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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

function ButtonAppBar(props) {

  const handleChange = () => {
  };

  const { classes, children } = props;
  console.log(children);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Route exact path="/summerTech" component={SummerTech} />
        <Route exact path="/addjob" component={AddJob} />
        <Toolbar>
        <div>
        <FormControl>
        <TextField
            label="Search"
              id="outlined-bare"
              margin="normal"
              variant="outlined"
            />
            </FormControl>
            </div>            
            <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>
            Type
          </InputLabel>
          <Select
            onChange={ handleChange }
            input={
              <OutlinedInput
                name="Type"
                id="type"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Full Time</MenuItem>
            <MenuItem value={20}>Part Time</MenuItem>
            <MenuItem value={30}>Contract</MenuItem>
          </Select>
        </FormControl>
          <Typography align="center" variant="h6" color="inherit" className={classes.grow}>
            {children}
          </Typography>
            <Button component={Link} to="/addJob" variant="contained" color="inherit" className={classes.button}>
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
