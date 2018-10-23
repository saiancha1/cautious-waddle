import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class SubForm extends React.Component {
  state = {
    open: false,
    fname: null,
    email: null,
    pop: false,

  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const {
      fname,
      email,
    } = this.state;

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

    if (fname == null || email == null) {
      alert('Please fill out both fields before subscribing.');
    } else {
    // .then(res => res.json()).then(response => console.log('Success', JSON.stringify(response)));
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

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  handleClose = () => {
    this.setState({
      open: false,
      fname: '',
      email: '',
    });
  };

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
