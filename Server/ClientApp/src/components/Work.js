import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './Work.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import background from '../images/homepage-image.jpg';
import ButtonAppBar from './AppBar/ButtonAppBar';
import ComplexGrid from './ComplexGrid/ComplexGrid';

const style = {
  Paper: {
    marginTop: 30,
    marginBottom: 30,
    gutterBottom: true
  },
};

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
        <div className="classesRoot">
          <div className="title">
          <ButtonAppBar >
            <h2>Job Listings</h2>
            </ButtonAppBar>
          </div>
          <div className="wrapper">
          <ul className="listing">
            {this.state.jobs.map(job => (
              <div>
              <Paper style={style.paper}>
                <ComplexGrid jobTitle={job.jobTitle} jobId={job.jobId} company={job.companyName} desc={job.jobDescription} salary={job.salary} type={job.workType} email={job.contactEmail}>                 
                  <p>To apply contact: {job.contactFirstName}{job.contactLastName}</p>
                  T: {job.contactPhone}  
                  E: <a href={"mailto:"+job.contactEmail}></a>
                </ComplexGrid>            
              </Paper>
              </div>
            ))}
          </ul>
          </div>
          </div>
    </div>
  );
}
}
export default Work;
