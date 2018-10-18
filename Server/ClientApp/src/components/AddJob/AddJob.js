import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AlertDialog from '../AlertDialog/AlertDialog';
import './AddJob.css';
import AuthService from '../Authentication/AuthService';

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

    const today = new Date();
    console.log(today);
    // date = { today.getFullYear() + '-' + today.getMonth() + 1 + '-' + today.getDate()},

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
      console.log("The state after clicking submit is");
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
      this.setState(
        {
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
        });
  }

    handleChange = name => (event) => {
      this.setState({
        [name]: event.target.value,
      })
    };

    render() {
      const login = this.props;
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
      if (login.auth) {
        return (
          <div>
            <AppBar color="default" position="static">
            <Typography align="center" variant="display3">New Job Listing</Typography>
            </AppBar>
            <Grid container spacing={32} sm={12}>
              <Grid item sm={3}/>
              <Grid item sm={6}>
                <Paper elevation4 style={style.Paper}>
                  <Typography align="center" variant="display2">Listing Details</Typography> 
                  <Divider />
                  <br/>
                  <Typography variant="headline">Job Details</Typography>       
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <Grid container spacing={32} sm={12} direction="row"> 
                        <Grid item>
                          <TextField
                            id="companyName"
                            label="Company Name"
                            value={companyName}
                            onChange={this.handleChange('companyName')}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="type-select"
                            select
                            label="Type"
                            value={workType}
                            onChange={this.handleChange('workType')}
                            helperText="Please select the type of employment"
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
                        </Grid>
                      </Grid>
                      <Grid container spacing={32} sm={12}>
                        <Grid item>
                          <TextField
                            id="jobTitle"
                            label="Job Title"
                            value={jobTitle}
                            onChange={this.handleChange('jobTitle')}
                            margin="normal"
                        />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="jobDescription"
                            flex="1"
                            multiline
                            rows="6"    
                            label="Job Description"
                            value={jobDescription}
                            onChange={this.handleChange('jobDescription')}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={32}>
                        <Grid item>
                          <TextField
                            id="salary"
                            label="Salary"
                            value={salary}
                            onChange={this.handleChange('salary')}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="date"
                            label="Listing Expiry Date"
                            type="date"
                            defaultValue="2017-05-24"
                            margin="normal"
                            onChange={this.handleChange('expiry')}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <Divider />
                    <br />
                    <Typography variant="headline">Contact Details</Typography>
                    <div className="form-group">
                      <Grid container spacing={32}>
                        <Grid item>
                          <TextField
                            id="contactLastName"
                            label="Surname"
                            value={contactLastName}
                            onChange={this.handleChange('contactLastName')}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="jobDescription"
                            label="First Name"
                            value={contactFirstName}
                            onChange={this.handleChange('contactFirstName')}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={32}>
                        <Grid item>
                          <TextField
                            id="contactEmail"
                            label="Email"
                            value={contactEmail}
                            onChange={this.handleChange('contactEmail')}
                            margin="normal"
                          />
                        </Grid>
                        <Grid item>
                          <TextField
                            id="contactPhone"
                            label="Telephone"
                            value={contactPhone}
                            onChange={this.handleChange('contactPhone')}
                            margin="normal"
                          />
                        </Grid>
                      </Grid>
                    </div>
                    <Button variant="outlined" color="default" onClick={this.handleSubmit}>
                      Submit
                    </Button>
                  </form>
                </Paper>           
              </Grid>
              <Grid item sm={3}/>
            </Grid>
          </div>
        );
      } else {
        return (
          <AlertDialog />
        );
      }
    }
}
const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddJob);