import React, { Component } from 'react';
import Consultant from './Consultants/Consultant';

// const cons = console;

class Consultants extends Component {
  state = {
    consultants: ['test', [1, 2, 3]],
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
      </div>
    );
  }
}
export default Consultants;
