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
          <Paper className="wrapper">
          <div className="title">
          <ButtonAppBar button="Add Job">
            Job Listings
            </ButtonAppBar>
          </div>
          <ul className="listing">
            {this.state.jobs.map(job => (
              <Paper>
                  <h1>{job.jobTitle}</h1>
                  <p> Job Description: {job.jobDescription}</p>
                  <p>Annual Salary: ${job.salary}</p>
              </Paper>
            ))}
          </ul>
          <br/>
          <br/>
          </Paper>
          </div>
    </div>
  );
}
}
export default Work;
