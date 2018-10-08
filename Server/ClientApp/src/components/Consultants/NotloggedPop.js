import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Consultants from '../Consultants';
import { Link } from 'react-router-dom';


class NotloggedPop extends React.Component {
  state = {
    open: true,
  };

  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
      <Consultants/>
        {/* <Button onClick={this.handleClickOpen}>Open alert dialog</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"You are not Logged in"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You must be logged in to add a Consultant.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Link to="/consultants">
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
            </Link>
            {/* <Button onClick={this.handleClose} color="primary" autoFocus>
              Login
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default NotloggedPop;