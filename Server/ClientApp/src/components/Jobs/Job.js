import React, { Fragment } from 'react';
import JobST from './JobStyledRender';
// This just renders the jobs - need to fix the props

const Job = (props) => {
  const jobs = props.cl.map((consultant) => 
    <JobST firstName={consultant.firstName} lastName={consultant.lastName} consultimage={consultant.imageurl} consultDescription={consultant.consultantDesc} 
    hisemail={consultant.email}
       />
  );
  return (
      <div className="row">
      {jobs}
      </div>
  );
};

export default Job;
