import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthService from '../Authentication/AuthService';

class AddJob extends Component {
    constructor(props) {
      super(props);

    this.state = {
      jobTitle: '',
      jobDescription: '',
      salary: '',
      expiry: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      const Auth = new AuthService();
      //const {
      //companyIdData,
      //jobTitleData,
      //jobDescriptionData,
      //salaryData,
      //expiryData,
      //} = this.state;
      const formInput = this.state;
      console.log(formInput);

      const res = () => fetch('/api/jobs/addJob', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify({
          formInput,
        }),
      });

      const PostingJobInfo = () => res.JSON();
      res();
      console.log(PostingJobInfo);
      console.log(res);
    }

    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value });
    }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <h1>Add Job Listing</h1>
          <label>
            {' '}
                    Job Title
          </label>
          <br />
          <input name="jobTitle" value={this.state.jobTitle} onChange={this.handleChange} required />
          <br />
          <br />
          <label>
                    Job Description
          </label>
          <br />
          <input name="jobDescription" value={this.state.jobDescription} onChange={this.handleChange} required />
          <br />
          <br />
          <label>
                    Salary
          </label>
          <br />
          <input name="salary" value={this.state.salary} onChange={this.handleChange} />
          <br />
          <br />
          <label>
                    Expiry
          </label>
          <br />
          <input name="expiry" type="datetime" value={this.state.expiry} onChange={this.handleChange} required />
          <br />
          {' '}
          <br />
          <input id="submit" name="submit" type="submit" value="Submit" />
        </form>
    );
  }
}

export default AddJob;
