import React from 'react';

const Consultant = (props) => {
  return (
    <div>
      {props.cl.map((consultant) => {
        return (
          <div>
            <h2>Name: {consultant.consultantName}</h2>
            <h3>{consultant.consultantDesc}</h3>
            <p>City: {consultant.city}</p>
            <p>Email: {consultant.contactEmail}</p>
            <p>Website: {consultant.website}</p>


          </div>);
      })}
    </div>
  );
};

export default Consultant;
