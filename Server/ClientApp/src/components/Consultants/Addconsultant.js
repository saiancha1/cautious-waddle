import React, { Component } from 'react';
import AuthService from '.././Authentication/AuthService';

class Addconsultant extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      loginStatus: false,
    }
  }

  // before mounting we change the state to current login status
async componentWillMount() {
  try { 
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
