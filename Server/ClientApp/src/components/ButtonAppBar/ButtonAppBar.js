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
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
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
      <AppBar position="static" color="default">
        <Route exact path="/addjob" component={AddJob} />
        <Toolbar>
            <InputLabel>
            Type
            </InputLabel>
            <Input  margin="dense">
            <Select
              color="default"
              onChange={handleChange}
            >
              <MenuItem value="" color='default'>
                <em>Work Type</em>
              </MenuItem>
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
            </Input>
            <Input 
            margin="dense"
              position="static"
              startAdornment={(
                <InputAdornment>
                  <SearchIcon />
                </InputAdornment>
              )}
                color="default"
                label="Search"
                id="search-jobs"
                variant="outlined"
            />
          <Typography align="center" variant="h6" color="inherit" className={classes.grow}>
            {children}
          </Typography>
          <Button component={Link} to="/addJob" variant="outlined" color="default" className={classes.button}>
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
