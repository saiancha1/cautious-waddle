import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthService from './AuthService';
import LoginModal from './LoginModal';
import { compLoggedOut } from '../../store/reducer';
import '../../App.css';
import history from '../history';


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
    event.preventDefault();
    const loggedOut = this.Auth.logout(event);
    if (loggedOut) {
      const sync = this.props;
      sync.syncLoggedOut();
      this.setState({ loggedIn: false });
      // history.push('/');
      window.location.reload();
    }
  }


  render() {
    // const { loggedIn } = this.Auth.loggedIn();

    const { loggedIn } = this.state;

    if (loggedIn === true) {
      window.location.reload();
      return (
        <button className="button-sign" href="#" onClick={this.handleLogout}>Log out</button>
      );
    } else {
      return (
        <LoginModal handleLogout={this.handleLogout} />
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
