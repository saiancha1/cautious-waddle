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
    // console.log(this.state.consultants);
    return (
      <div>
        <h1>Consultants</h1>
        <Consultant cl={this.state.consultants}/>


        {/* {this.state.consultants.map((consultant) => {
          return (
            <div>
            <h3>
              Name of Consultant:  {consultant.consultantName}
            </h3>
            <p>Description: {consultant.consultantDesc}</p>
            <p>City: {consultant.city}</p>

            <h1></h1>
            </div>
          );
        })} */}


      </div>
    );
  }
}
// const Consultants = () => (
//   <div>
//     <h1>Consultants</h1>
//   </div>
// );

export default Consultants;
