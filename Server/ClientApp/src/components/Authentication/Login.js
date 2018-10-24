import React, { Component } from 'react';
import { NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import AuthService from './AuthService';
import LoginModal from './LoginModal';
import { compLoggedOut } from '../../store/reducer';
import '../../App.css';
import history from '../history';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      anchorEl: null,
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
  handleMenuClose = () => {
    this.setState({anchorEl:null});
  }
  handleMenuOpen = (event) => {
    this.setState({anchorEl:event.currentTarget});
  }

  handleProfileClick = () => {
    history.push('/myprofile');
    this.handleMenuClose();
  }

  render() {
    // const { loggedIn } = this.Auth.loggedIn();

    const { anchorEl, loggedIn } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
      </Menu>
    );

    if (loggedIn === true) {
      return (
        <div>
          <IconButton color="inherit">
            <AccountCircle onClick= {this.handleMenuOpen} />
          </IconButton>
        {renderMenu}
        </div>
        );
    } else {
      return (
        <LoginModal handleLogout={this.handleLogout} 
        handleMenuOpen = {e => this.handleMenuOpen(e)}
        renderMenu = {renderMenu}/>
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
