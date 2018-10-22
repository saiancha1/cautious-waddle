import React, { Component } from 'react';
import Consultant from './Consultants/Consultant';
import AuthService from './Authentication/AuthService';
import history from './history';
import Addz from './Consultants/Addz';
import consultantimage from '../images/consulting1.jpg';
import './consultants.css';

const style = {

  AppBar: {
    marginTop: 10,
    marginBottom: 10,

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
  // Get method gets the consultant information from the database, and places it in state to be used by
  // other components.

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

  // This method prompts user and displays alert when not logged in and user tries to click join consultant button
  handleNotLogged() {
    try {
      alert('Please Login to Add Consultant');
      // window.location.reload();
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  // handle click method - self explanatory
   handleClick = (e) => {
     if (this.state.loginStatus == true) {
       history.push('/addconsultant');
     } else {
       this.handleNotLogged();
     }
   }

   // The render here is that of the header, image banner, and then the add consultant component,
   // only the button of which is displayed on this page, while the rest can be found in the Addz.js file in Consultants folder
   // Finally the consultant component here passes the list of consultants that the GET method retrieves and passes it into
   // the Consultant component also in the consultants folder

   render() {
     const { classes } = this.props;
     return (
     //  <div className="consultimagecontainer">
     //    <img className="consultimage" src={consultantimage} alt="consulting2" />
     //    <div className="consultWelcome" pull-right>
     //      <h1>Tech Consultants</h1>
     //      <h4>
     //        Find out Who's Who
     //        {' '}
     //      </h4>
     //      <h4>
     //        {' '}
     //      </h4>
     //      <Addz className="addbutton" />
     //    </div>
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
