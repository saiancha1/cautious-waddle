import React, { Component } from 'react';
import AuthService from '.././Authentication/AuthService';

// const ress = this.Auth.loggedIn;

class Addconsultant extends Component {
  state = {
    loginStatus: false,
  }
  constructor(props) {
    super();
    this.Auth=new AuthService();
  }

  //before mounting we change the state to current login status
async componentWillMount() {
  try { 
    // const statuslogin = this.Auth.loggedIn();
    this.setState ( {loginStatus: this.Auth.loggedIn() },
   )} catch(e){

   } }

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
