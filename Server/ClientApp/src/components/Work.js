import React, { Component } from 'react';

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
      <h1>Work</h1>
      <p>Lorem ipsum dolor sit amet..</p>
      <ul>
        {this.state.jobs.map(job => (
                <li>
                  <p>{job.jobTitle}</p>
                </li>
              ))}
            </ul>
    </div>
  );
}
}
export default Work;
