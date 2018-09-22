import React, { Component } from 'react';

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
        consultants: consultantlist 
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
        {this.state.consultants.map((consultant) => {
          return (
            <div>
            <h3>{consultant.consultantName}</h3> 
            <p>{consultant.consultantDesc}</p>
            <p>{consultant.city}</p>
            </div>
          );
        })}
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
