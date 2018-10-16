import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import AuthService from './AuthService';
import LoginModal from './LoginModal';
import { connect } from 'react-redux';
import { compLoggedOut } from '../../store/reducer';
import '../../App.css';
import history from '../history';
import HeaderMenu from '../Header/HeaderMenu';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      isAdmin:false,
    };

    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidMount() {
    fetch('api/auth/isAdmin', {
      headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
    })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ isAdmin: true });
        } else {
          this.setState({ isAdmin: false });
        }
  })
}
  handleLogout = (event) => {
    event.preventDefault();
    const loggedOut = this.Auth.logout(event);
    if (loggedOut) {
      const sync = this.props;
      sync.syncLoggedOut();
      this.setState({ loggedIn: false });
      this.setState({isAdmin:false});
      history.push('/');      
    }
  }
  
 
  render() {
    // const { loggedIn } = this.Auth.loggedIn();

    const { loggedIn } = this.state;
    
    if (loggedIn === true) {
      return (
        <div>
        <HeaderMenu isAdmin = {this.state.isAdmin}/>
        <button className="button-sign" href="#" onClick={this.handleLogout}>Log out</button>
        </div>
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
