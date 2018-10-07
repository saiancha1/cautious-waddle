import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

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
    <Link to="/summertech">
          <button>Summer of Tech</button>
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
          <Link to="/addJob">
          <button>Add Job Listing</button>
          </Link>
    </div>
  );
}
}
export default Work;
