import React, { Component } from 'react';
import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Consultant from './Consultants/Consultant';
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

  render() {
    return (
        <div>
          <h1>Consultants</h1>
          <Consultant cl={this.state.consultants}/>
          <Link to="/addconsultant">
          <button>Add Consultant</button>
          </Link>
        </div>
    );
  }

}
export default Consultants;
