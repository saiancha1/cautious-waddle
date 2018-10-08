import React, { Fragment } from 'react';
import JobST from './JobStyledRender';
// This just renders the jobs - need to fix the props

const Job = (props) => {
  const jobs = props.cl.map((job) => 
    <JobST JName={job.JobTitle} JDescription={job.JobDescription} JSalary={job.Salary} 
       />
  );
  return (
      <div className="row">
      {jobs}
      </div>
  );
};

export default Job;
