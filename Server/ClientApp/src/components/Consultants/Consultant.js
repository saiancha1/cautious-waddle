import React from 'react';

const Consultant = props => (
  <div>
    {props.cl.map(consultant => (
      <div key={consultant.consultantId}>
        <h2>
Name:
          {' '}
          {consultant.consultantName}
        </h2>
        <h3>{consultant.consultantDesc}</h3>
        <p>
City:
          {' '}
          {consultant.city}
        </p>
        <p>
Email:
          {' '}
          {consultant.contactEmail}
        </p>
        <p>
Website:
          {' '}
          {consultant.website}
        </p>
        <br />


      </div>))}
  </div>
);

export default Consultant;
