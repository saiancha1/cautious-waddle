import React, { Component } from 'react';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import SummerTech from './SummerTech/SummerTech';
import AddJob from './AddJob/AddJob';


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
     <Route exact path="/summerTech" component={SummerTech} />
     <Route exact path="/addjob" component={AddJob} />

    <Link to="/summertech">
          Summer of Tech
          </Link>
        <br/>
        <br/>
        <Link to="/addjob">
          <button>Add Job Listing</button>
          </Link>
          <br/>
          <br/>

      <h1>Work</h1>
      <p>Lorem ipsum dolor sit amet..</p>
      <ul>
        {this.state.jobs.map(job => (
                <li>
                  <h1>{job.jobTitle}</h1>
                  <p> Job Description: {job.jobDescription}</p>
                  <p>Annual Salary: ${job.salary}</p>
                </li>
        ))}
            </ul>
            <br/>
            <br/>
    </div>
  );
}
}
export default Work;
