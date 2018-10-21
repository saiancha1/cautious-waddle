import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Consultant from './Consultants/Consultant';
import AuthService from './Authentication/AuthService';
import history from './history';
import Addz from './Consultants/Addz';
import consultantimage from '../images/consulting2.jpg';
import './consultants.css';


const style = {

  AppBar: {
    marginTop: 10,
    marginBottom: 10,
    // colorPrimary: 'white',
    // background: 'white',
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
     const { classes } = this.props;
     return (
       <div>
         <div className="myimage">
           <img src={consultantimage} alt="consulting1" />
         </div>
         <div className="consultWelcome" pull-right>
           <h1>Tech Consultants</h1>
           <h4>
             Find out Who's Who
             {' '}
           </h4>
           <h4>
             In Palmerstorn North Tech
             {' '}

           </h4>
         </div>


         {/* <AppBar style={style.AppBar} position="static" color="default"> */}

         {/* <Typography align="center" variant="headline">Consultants</Typography> */}
         {/* </AppBar> */}

         <Consultant cl={this.state.consultants} />
         {/* <Button onClick={this.handleClick}> Join Consultants</Button> */}
         <Addz />
       </div>

     );
   }
}


export default Consultants;
