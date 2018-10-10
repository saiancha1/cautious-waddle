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
      contactFirstName: '',
      contactLastName: '',
      contactEmail: '',
      contactPhone: '',
      companyName: '',
      workType: '',
      expiry: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

    handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
      const Auth = new AuthService();
      const {
        jobTitle,
        jobDescription,
        salary,
        contactFirstName,
        contactLastName,
        contactEmail,
        contactPhone,
        companyName,
        workType,
        expiry,
      } = this.state;
      console.log(jobTitle);

      const res = () => fetch('/api/jobs/addJob', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`,
        },
        body: JSON.stringify({
          jobTitle: jobTitle,
          jobDescription: jobDescription,
          salary: salary,
          contactFirstName: contactFirstName,
          contactLastName: contactLastName,
          contactEmail: contactEmail,
          contactPhone: contactPhone,
          companyName: companyName,
          workType: workType,
          expiry: expiry,
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
      const login = this.props;
      const state = this.state;
      // if (login.auth) {
      if (true) {
        return (
          <form onSubmit={this.handleSubmit}>
            <h1>Add Job Listing</h1>
            <div className="form-group">
              <label htmlFor="sel1">Work Type </label>
              <select className="form" id="sel1">
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Contract</option>
              </select>
              <br />
              <label htmlFor="companyName">
                Company Name
              </label>
              <input name="companyName" id="companyName" value={state.companyName} onChange={this.handleChange} required />
              <br />
              <br />
              <label htmlFor="jobTitle">
                Job Title
              </label>
              <input name="jobTitle" id="jobTitle" value={state.jobTitle} onChange={this.handleChange} required />
              <br />
              <br />
              <label>
                    Job Description
              </label>
              <input name="jobDescription" value={state.jobDescription} onChange={this.handleChange} required />
              <br />
              <br />
              <label>
                    Salary
              </label>
              <input name="salary" value={state.salary} onChange={this.handleChange} />
              <br />
              <br />
              <label>
                    Expiry
              </label>
              <input name="expiry" type="datetime" value={state.expiry} onChange={this.handleChange} required />
            </div>
            <br />
            <p>Contact Details</p>
            <div className="form-group">
              <label>
                    First Name
              </label>
              <input name="contactFirstName" value={state.contactFirstName} onChange={this.handleChange} required />
              <br />
              <br />
              <label>
                    Last Name
              </label>
              <input name="contactLastName" value={state.contactLastName} onChange={this.handleChange} required />
              <br />
              <br />
              <label>
                    Email
              </label>
              <input name="contactEmail" value={state.contactEmail} onChange={this.handleChange} required />
              <br />
              <br />
              <label>
                    Phone
              </label>
              <input name="contactPhone" value={state.contactPhone} onChange={this.handleChange} required />
              <br />
              <br />
            </div>
            <br />
            <input id="submit" name="submit" type="submit" value="Submit" />
          </form>
        );
      } else {
        return (
          <div>
            <p>This function is only available to valid account holders.</p>
            <p>If you have an account, please login to submit a new job posting.</p>
            <p> If you do not have an account you can create and account via the login option above.</p>
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
