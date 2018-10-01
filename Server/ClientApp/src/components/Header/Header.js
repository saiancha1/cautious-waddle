import React, { Component } from 'react';
import Login from '../Authentication/Login';
import logo from '../../images/logoV2.png';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="page-header">
        <img className="logo" src={logo} alt="logo" />
        <h2>Tech Palmy</h2>
        <div className="login-button">
          <Login />
        </div>
      </div>
    );
  }
}

export default Header;
