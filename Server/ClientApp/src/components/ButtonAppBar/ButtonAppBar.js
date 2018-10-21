import React, { Component } from 'react';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import AddJob from '../AddJob/AddJob';
import AuthService from '../Authentication/AuthService';
import history from '../history';

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


class ButtonAppBar extends Component {
  constructor(props) {
    super(props);

    const Auth = new AuthService();
    const Authorized = Auth.loggedIn();
  }

    state = {
      loginStatus: '',
    }

  handleClick = (e) => {
    this.setState({ loginStatus: this.Authorized });
    console.log(this.state);
    const { loginStatus } = this.state;
    if (loginStatus === true) {
      history.push('/addJob');
    } else {
      this.handleNotLogged();
    }
  }

  handleNotLogged() {
    try {
      alert('Please login with your account details to add a new job listing!');
      } catch (error) {
        alert('There seems to be a problem!');
      }
    } 

render() {
  const { classes, children, filter, handleFilterChange } = this.props;
  console.log(children);
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Route exact path="/addjob" component={AddJob} />
        <Toolbar>
          <FormControl>
            <InputLabel>
              Type
            </InputLabel>
            <Select
              value={filter}
              color="default"
              onChange={handleFilterChange}
            >
              <MenuItem value="All" selected="true" color="default">
                <em>Work Type</em>
              </MenuItem>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Full Time">Full Time</MenuItem>
              <MenuItem value="Part Time">Part Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </FormControl>
          {/*<Input
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
            /> */}
          <Typography align="center" variant="h6" color="inherit" className={classes.grow}>
            {children}
          </Typography>
          <Button onClick={this.handleClick} color="default" className={classes.button}>
                Add Listing
          </Button>
        </Toolbar>
      </AppBar>
    </div>
    );
  }
}


/*{ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};}*/
export default withStyles(styles)(ButtonAppBar);
