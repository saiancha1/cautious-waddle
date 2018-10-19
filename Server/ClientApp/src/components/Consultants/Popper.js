import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router-dom';
import AuthService from '../Authentication/AuthService';
import StandardButton from './StandardButton';


// const loggednow = this.Auth.loggedin();

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});


class SimplePopper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,

    };
  }

  Auth = new AuthService();


  handleClick = (event) => {
    const { currentTarget } = event;
    // if (this.Auth.loggedIn()) {
    //   // console.log('LOGGED IN WORKS');
    //   return <Redirect to="/consultants" />;
    // }
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open,
    }));
  };

  render() {
    if (this.Auth.loggedIn()) {
      // console.log('LOGGED IN WORKS');
      return;
        <Redirect to="/consultants" />;
    } else {
      const { classes } = this.props;
      const { anchorEl, open } = this.state;
      const id = open ? 'simple-popper' : null;

      return (
        <div>
          <Button aria-describedby={id} variant="contained" onClick={this.handleClick} className={classes.button}>
          Join Consultants Page
          </Button>
          <Popper id={id} open={open} anchorEl={anchorEl} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography className={classes.typography}>You must be logged in</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      );
    }
  }
}

SimplePopper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePopper);
