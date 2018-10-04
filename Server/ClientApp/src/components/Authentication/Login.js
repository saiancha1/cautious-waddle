import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import AuthService from './AuthService';
import LoginModal from './LoginModal';
import { connect } from 'react-redux';
import { compLoggedOut } from '../../store/reducer';


class Login extends Component {
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
      const sync = this.props;
      sync.syncLoggedOut();
      this.setState({ loggedIn: false });
    }
  }

  render() {
    // const { loggedIn } = this.Auth.loggedIn();

    const { loggedIn } = this.state;

    if (loggedIn === true) {
      return (
        <button href="#" onClick={this.handleLogout}>Log out</button>
      );
    } else {
      return (
        <LoginModal handleLogout={this.handleLogout}/>
      );
    }
  }
}
const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({
  syncLoggedOut: () => dispatch(compLoggedOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
