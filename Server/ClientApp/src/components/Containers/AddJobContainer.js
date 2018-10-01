import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddJob from './AddJob';

class AddJobContainer extends Component {
  
  postDataHandler = () => {
    const post = {
      type: this.state.type,
      position: this.state.position,
      location: this.state.location,
      description: this.state.description,
    };
    // Axios.post('https://capstone1.azurewebsites.net/api/jobs/addJob',post);
  }

  render() {
    return (
      <AddJob value={this.props.auth}/>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.authenticated
  };
};

export default connect(mapStateToProps)(AddJobContainer);
