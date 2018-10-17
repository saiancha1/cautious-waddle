import React, { Component } from 'react';
import { connect } from 'react-redux';
//import AuthService from '../Authentication/AuthService';

class AddJob extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      position: '',
      location: '',
      description: '',
    };

    //this.Auth = new AuthService();
  }


  postDataHandler = () => {
    const post = {
      type: this.state.type,
      position: this.state.position,
      location: this.state.location,
      description: this.state.description,
    };

    // TODO: Change this for a fetch call instead of Axios

    // Axios.post('https://capstone1.azurewebsites.net/api/jobs/addJob',post);
  }

  render() {
    const login = this.props;
    if (login.auth) {
      return (
        <div>
          <h1>Add Job</h1>
          <p>
            To add a new job listing please complete and submit the below form.
          </p>
          <form action={this.postDataHandler} formMethod="post">
                  Type:
            {' '}
            <select name="jobs">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
            <br />
                  Position:
            {' '}
            <input type="text" name="position" />
            <br />
                  Location:
            {' '}
            <input type="text" name="location" />
            <br />
                  Description:
            {' '}
            <textarea name="message" rows="10" cols="30" />
            <br />
                  Image:
            {' '}
            <input type="button" value="Upload" name="image" />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p>This function is only available to valid account holders.</p>
          <p>If you have an account, please login to submit a new job posting. If you do not have an account you can sign up via the login option above.</p>
        </div>);
    }
  }
}

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);
