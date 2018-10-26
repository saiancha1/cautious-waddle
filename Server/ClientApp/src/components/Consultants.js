import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Consultant from './Consultants/Consultant';
import AuthService from './Authentication/AuthService';
import history from './history';
import Addz from './Consultants/Addz';
import consultantimage from '../images/consulting1.jpg';
import './consultants.css';
import grey from '@material-ui/core/colors/grey';


const mygrey = grey[700];

// This page displays the consultants and also makes the GET request from the database to pull the info.
// It then hands all the info as props to the Consultant.js component which maps the information
// then this information is styled by ConsultantStyledRender and then returned to Consultant.js which
// then in turn returns in here to be displayed

const style = {

  AppBar: {
    marginTop: 10,
    marginBottom: 10,

  },

  consultimage: {
    // width: '2000px',
    // height: '400px',
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
  // This is the Get request to get ALL the approved consultants in the database
  // this list is then saved in state

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

  // This method handles users trying to click add consultant when not logged in
  // handleNotLogged() {
  //   try {
  //     alert('Please Login to Add Consultant');
  //     // window.location.reload();
  //   } catch (error) {
  //     alert('There seems to be a problem!');
  //   }
  // }

  // // this method handles the click on the join consultant page button, if user is logged in then he is passed on
  // //
  //  handleClick = (e) => {
  //    if (this.state.loginStatus == true) {
  //      history.push('/addconsultant');
  //    } else {
  //      this.handleNotLogged();
  //    }
  //  }

  render() {
    const { classes } = this.props;
    return (
      <div className="consultants">
        <div className="heroImg">
          <div className="mycontainer" pull-right>
            <h1>Consultants</h1>
            <p>Find out Who's who</p>
            {' '}
            <Addz />
          </div>
        </div>

        <Consultant cl={this.state.consultants} />
        {/* <Button onClick={this.handleClick}> Join Consultants</Button> */}
      </div>


    );
  }
}


export default Consultants;
