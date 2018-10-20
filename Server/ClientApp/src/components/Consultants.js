import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Redirect, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Consultant from './Consultants/Consultant';
import AuthService from './Authentication/AuthService';
import history from './history';
import Addz from './Consultants/Addz';

const style = {

  AppBar: {
    marginTop: 10,
    marginBottom: 10,
    // colorPrimary: 'white',
    // background: 'white',
  },
};

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


  handleNotLogged() {
    try {
      alert('Please Login to Add Consultant');
      // window.location.reload();
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

   handleClick = (e) => {
     if (this.state.loginStatus == true) {
       history.push('/addconsultant');
     } else {
       this.handleNotLogged();
     }
   }

   render() {
     return (
       <div>
         <AppBar style={style.AppBar} position="static" color="default">

           <Typography align="center" variant="headline">Consultants</Typography>
         </AppBar>

         <Consultant cl={this.state.consultants} />
         {/* <Button onClick={this.handleClick}> Join Consultants</Button> */}
         <Addz />
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
