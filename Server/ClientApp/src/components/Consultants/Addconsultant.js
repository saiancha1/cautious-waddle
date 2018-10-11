import React, { Component } from 'react';
import AuthService from '../Authentication/AuthService';
import StandardButton from './StandardButton';
import SimplePopper from './Popper';
// import Popper from './Popper';
import { Link } from 'react-router-dom'

class Addconsultant extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      loginStatus: this.Auth.loggedIn(),
    };
      }

  render() {
    return (
      <div>
        {this.state.loginStatus ? (
      <Link  to="/addconsultant"> 
          <StandardButton/></Link>
        ) : (<SimplePopper />) }</div>
    )
}
}


export default Addconsultant;
