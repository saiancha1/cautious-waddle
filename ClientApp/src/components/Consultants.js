import React, { Component } from 'react';
import {BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';
import Consultant from './Consultants/Consultant';
import Addconsultant from './Consultants/Addconsultant';


class Consultants extends Component {
  state = {
    consultants: [],
  }

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
