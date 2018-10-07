import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthService from '../Authentication/AuthService';

class AddJob extends Component {
    state = {
      jobTitle: '',
      jobDescription: '',
      salary: '',
      expiry: '',
    }

    Auth = new AuthService();

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      const {
      jobTitleData,
      jobDescriptionData,
      salaryData,
      expiryData,
      } = this.state;

      const res = () => fetch('/api/jobs/addJob', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.Auth.getToken()}`,
        },
        body: JSON.stringify({
          jobTitle: 'Python Developer',
          jobDescription: 'Machine Learning Python Development Role',
          salary: 78000,
          expiry: '12/1/2018 12:00:00',
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
                    Website
          </label>
          <br />
          <input name="website" value={this.state.website} onChange={this.handleChange} />
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
