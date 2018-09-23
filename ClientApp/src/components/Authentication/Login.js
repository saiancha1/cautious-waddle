import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import AuthService from './AuthService';
import LoginForm from './LoginForm';
import LoginModal from './LoginModal';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userEmail: '',
      userPass: '',
      loggedIn: false,
      open: false,
    };
    // this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.Auth = new AuthService();
  }

  handleChange(e) {
    this.setState(
      {
        [e.target.name]: e.target.value,
      },
    );
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

   handleSubmit = async (event) => {
     event.preventDefault();
     await this.Auth.handleSubmit(event, this.state.userEmail, this.state.userPass)
       .then((res) => {
         if (res === true) {
           this.setState({ loggedIn: true });
         }
       });
   }

  handleLogout1 = (event) => {
    event.preventDefault();
    this.Auth.logout(event).then((res2) => {
      console.log(res2);
      if (res2) this.setState({ loggedIn: false });
    });
  }

  handleLogout = (event) => {
    event.preventDefault();
    const loggedOut = this.Auth.logout(event);
    if (loggedOut) {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    const { loggedIn } = this.Auth.loggedIn();

    if (loggedIn === true) {
      return (
        <NavItem href="#" onClick={this.handleLogout}>Log out</NavItem>
      );
    } else {
      return (
        <LoginModal />
      );
    }
  }
}
