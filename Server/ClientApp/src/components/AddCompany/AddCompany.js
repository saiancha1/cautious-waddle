import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddCompany extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      position: '',
      location: '',
      description: '',
    };
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
          <h1>Add Company</h1>
          <p>You may add your company listing using the below form</p>
          <p> Please complete all fields and then click submit.</p>
          <form action={this.postDataHandler} formMethod="post">
            <br />
                  Company Name:
            <input type="text" name="companyName" />
            <br />
            <br />
                  Industry:
            <input type="text" name="industry" />
            <br />
            <br />
                Speciality:
            <input type="text" name="speciality" />
            <br />
            <br />
                Email:
            <input type="text" name="email" />
            <br />
            <br />
                Website:
            <input type="text" name="website" />
            <br />
            <br />
                  Address:
            <textarea name="message" rows="10" cols="30" />
            <br />
            <br />
                  Summary:
            <textarea name="message" rows="10" cols="30" />
            <br />
            <br />
                  Size (number of people):
            <input type="text" name="size" />
            <br />
            <br />
                  Summer Students:
            <select name="summerStudents">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <br />
            <br />
                  Mailing List:
            <select name="companyForm">
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <br />
            <br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p>This page is accessible only to valid account holders.</p>
          <p>If you have an account, please login to submit a new company listing.</p>
        </div>);
    }
  }
}

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany);
