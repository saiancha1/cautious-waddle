import React, { Component } from 'react';
import AuthService from '.././Authentication/AuthService';

class Addconsultant extends Component {
  state = {
    loginStatus: false,
  }
  constructor(props) {
    super(props);
    this.Auth=new AuthService();
  }

async componentWillMount() {
  try {
    const res = await this.Auth.loggedIn;
    this.setState({loginStatus: res});
  } catch(e) {
    console.log(e)
  }
};


  render() {
    return (
  <div> {this.state.loginStatus ? (
    <h1>logged in</h1>
  ) : (<h1>logged out </h1>)
  }
    {/* {this.Auth.loggedIn ? (
      <h1>Logged In</h1>
    ) : (
      <h1>Not logged in</h1>
    )
       } */}
  </div>)};
}

export default Addconsultant;
