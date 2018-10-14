import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './Work.css';
import background from '../images/homepage-image.jpg';
import Paper from '@material-ui/core/Paper';
import ButtonAppBar from './AppBar/ButtonAppBar';

class Work extends Component {
state = {
  jobs: [],
};

async componentWillMount() {
  fetch('api/jobs/getJobs').then(res => res.json())
    .then((json) => {
      this.setState({ jobs: json });
    });
}

render() {
  console.log(this.state.jobs);
  return (
    <div className="jobs">
            <div className="home-container">
          <img className="background-image" src={background} alt="background" />
          <div className="centered-text">
            <h3>
              <span>Work Opportunities</span>
              <br />
              Current IT vacancies in Palmerston North
            </h3>
          </div>
        </div>
        <br/>
        <br/>
          <br/>
          <br/>
        <div className="">
          <div className="title">
          <ButtonAppBar >
            <h2>Job Listings</h2>
            </ButtonAppBar>
          </div>
          <div className="wrapper">
          <ul className="listing">
            {this.state.jobs.map(job => (
              <Paper >
                  <h3>{job.jobTitle}</h3>
                  <p className="compName">{job.companyName}</p>
                  <p>{job.workType} ${job.salary}</p>
                  <p>{job.jobDescription}</p>
                  To Apply contact: {job.contactFirstName}{job.contactLastName}
                  T: {job.contactPhone} 
                  E: {job.contactEmail} 
              </Paper>
            ))}
          </ul>
          </div>
          </div>
    </div>
  );
}
}
export default Work;
