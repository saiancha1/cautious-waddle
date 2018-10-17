import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import PaperSheet from '../PaperSheet/PaperSheet';
import Divider from '@material-ui/core/Divider';
import AuthService from '../Authentication/AuthService';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import './AddJob.css';

const style = {

  AppBar: {
    marginTop: 10,
    marginBottom: 10,
    colorPrimary: 'white',
  },
  Paper: {
    marginTop: 30,
    marginBottom: 30,
    gutterBottom: true,
    boxShadow: 2,
    backgroundColor: 'f9f9f9',
  }
};


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

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    //handleChange = (e) => {
     // this.setState({ [e.target.name]: e.target.value });
    //}

    render() {
      const login = this.props;
      const state = this.state;
      // if (login.auth) {
      if (true) {
        return (
          <div>
            <AppBar color="default" position="static">
            <h1>Add New Job Listing</h1>
            </AppBar>
            <Grid container spacing={8} sm={12}>
              <Grid item sm={3}/>
              <Grid item sm={6}>
            <Paper elevation4 style={style.Paper}>
              
              <Typography align="center" variant="display2">Add New Listing</Typography>        
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
              <TextField
                id="type-select"
                select
                label="Type"
                value={state.workType}
                onChange={this.handleChange('workType')}
                helperText="Please select the type of work"
                margin="normal"
              >
                  <MenuItem key="Full Time" value="Full Time">
                  Full Time
                  </MenuItem>
                  <MenuItem key="Part Time" value="Part Time">
                  Part Time
                  </MenuItem>
                  <MenuItem key="Contract" value="Contract">
                  Contract
                  </MenuItem>
              </TextField>

                    <TextField
                      id="companyName"
                      label="Company Name"
                      value={state.companyName}
                      onChange={this.handleChange('companyName')}
                      margin="normal"
                    />
                    <br/>
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
                    <Divider/>
                  <br/>
                    <Typography variant="headline">Contact Details</Typography>
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
                  </Paper>           
                  </Grid>
              <Grid item sm={3}/>
            </Grid>
          </div>
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

