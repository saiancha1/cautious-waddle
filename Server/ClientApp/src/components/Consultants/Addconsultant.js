import React, { Component } from 'react';
import AuthService from '.././Authentication/AuthService';

class Addconsultant extends Component {
  constructor(props) {
    super(props);
    this.Auth=new AuthService();
  }

  render() {
    return (
      <div>
        {this.Auth.loggedIn() ? (
          <h1>Logged In</h1>
        ) : (
          <h1>Not logged in</h1>
        )
           }
      </div>
    );
  }
}

export default Addconsultant;
