import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import AuthService from './AuthService';
import LoginModal from './LoginModal';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };

    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = (event) => {
    // const { loggedIn } = this.state;
    event.preventDefault();
    const loggedOut = this.Auth.logout(event);
    if (loggedOut) {
      this.setState({ loggedIn: false });
    }
  }

  render() {
    // const { loggedIn } = this.Auth.loggedIn();

    const { loggedIn } = this.state;
    
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
