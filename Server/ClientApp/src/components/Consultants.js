import React, { Component } from 'react';
import Consultant from './Consultants/Consultant';
import Addconsultant from './Consultants/Addconsultant';

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
          <Addconsultant />

        </div>
    );
  }

}
export default Consultants;
