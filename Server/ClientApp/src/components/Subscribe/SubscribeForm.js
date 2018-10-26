import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// This is the component that controls and runs the Subscribe to mailing list function from the front end
// it is placed on the right hand side footer of the website
// It is a popup form that requires both name and email fields to be inputted before submission
export default class SubForm extends React.Component {
  state = {
    open: false,
    fname: null,
    email: null,
    pop: false,

  };

  // handle submit function is a post request to the end point URL of the backend API - tranfers the name and
  // email submitted into format that can be processed by the bbackend and placed in the body of post request
  // method also does a check if either field is empty then an error message is displayed to user,
  // both name and email fields are needed for submission
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const {
      fname,
      email,
    } = this.state;

    // Post request to submit data
    const res = () => fetch('/api/mailingList/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: fname,
        emailAddress: email,
      }),
    });

    // This is a check that neither name or email fields are empty
    if (fname == null || email == null) {
      alert('Please fill out both fields before subscribing.');
    } else {
      this.setState({ open: false });
      res();
      this.handleSubscribe();
      this.setState({
        fname: null,
        email: null,
      });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // matching of input values from form to name inputs
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // handles closing of the subsribe popup forms, resets input fields
  handleClose = () => {
    this.setState({
      open: false,
      fname: '',
      email: '',
    });
  };

  // popup message when subscribe is successful or when there is an error
  handleSubscribe() {
    try {
      alert('Thank you. You have been Subscribed.');
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  render() {
    return (
      <div>
        <a onClick={this.handleClickOpen}>Subscribe</a>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              you Job and Event updates.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full Name"
              type="text"
              name="fname"
              value={this.state.fname}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              autoComplete="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
