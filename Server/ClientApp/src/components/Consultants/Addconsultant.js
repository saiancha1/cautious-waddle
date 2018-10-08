import React, { Component } from 'react';
import ConForm from './ConForm';
import AuthService from '../Authentication/AuthService';
import NotloggedPop from './NotloggedPop';

class Addconsultant extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      loginStatus: false,
    };
  }

  render() {
    return (
      <div>
        {' '}
        {this.state.loginStatus ? (
          <ConForm />
        ) : (<NotloggedPop />)
}
      </div>);
  }
}


export default Addconsultant;
