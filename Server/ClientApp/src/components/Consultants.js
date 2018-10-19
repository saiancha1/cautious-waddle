import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Consultant from './Consultants/Consultant';
import AuthService from './Authentication/AuthService';
import history from './history';


// Creating initial state and setting it to empty
class Consultants extends Component {
  Auth = new AuthService();

  state = {
    consultants: [],
    loginStatus: this.Auth.loggedIn(),

  }

  // Fetching consultants info from API pre-mounting

  async componentWillMount() {
    try {
      const res = await fetch('api/Consultants/getConsultants');
      const consultantlist = await res.json();
      console.log(consultantlist);
      this.setState({
        consultants: consultantlist,
      });
    } catch (error) {
      console.log(error);
    }
  }


  handleSubscribe() {
    try {
      alert('Please Login to Add Consultant');
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

   handleClick = (e) => {
     if (this.state.loginStatus == true) {
       console.log('click works');
       history.push('/addconsultant');
     } else {
       this.handleSubscribe();
     }
   }

   render() {
     return (
       <div>
         <h1>Consultants</h1>
         <Consultant cl={this.state.consultants} />
         <Button onClick={this.handleClick}> Join Consultants</Button>
       </div>
     );
   }
}

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Consultants);
