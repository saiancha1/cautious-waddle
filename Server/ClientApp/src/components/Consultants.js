import React, { Component } from 'react';
import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Consultant from './Consultants/Consultant';
import AuthService from './Authentication/AuthService';

// Creating initial state and setting it to empty
class Consultants extends Component {
  state = {
    consultants: [],
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
  checktoken =  async () => {
    await fetch('api/Consultants/getConsultants',{
     method: 'POST',
     headers: {
       'Authorization': 'Token' + localStorage.getItem('id_token'),

     }
   }).then(res => res.json())
   .then(json =>{
    return json;
   })
   };
  
  render() {
    return (
        <div>
          <h1>Consultants</h1>
          <Consultant cl={this.state.consultants}/>

 {/* Here we need to add if  statement - if logged in then link below otherwise to login page or statement asking user to login*/}
          <Link to="/addconsultant">
          <button>Add Consultant</button>
          </Link>
        </div>
    );
  }

  // getConsultants =  async () => {
  //   await fetch('api/Consultants/getConsultants',{
  //    method: 'GET',
  //    headers: {
  //      'Authorization': 'Token' + localStorage.getItem('id_token'),

  //    }
  //  }).then(res => res.json())
  //  .then(json =>{
  //   return json;
  //  })
  //  };

  
}
export default Consultants;
