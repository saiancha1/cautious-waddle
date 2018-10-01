import React, { Component } from 'react';
import ConForm from './ConForm';
import AuthService from '../Authentication/AuthService';

class Addconsultant extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      loginStatus: true,
    };
  }

  render() {
    return (
      <div>
        {' '}
        {this.state.loginStatus ? (
          <ConForm />
        ) : (<h1>logged out</h1>)
}
      </div>);
  }
}


export default Addconsultant;
