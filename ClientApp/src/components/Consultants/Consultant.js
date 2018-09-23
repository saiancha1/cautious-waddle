import React from 'react';

const Consultant = (props) => {
  return (
    <div>
      {props.cl.map((consultant) => {
        return (
          <div>
            <h1>{consultant.consultantName}</h1>
            <p>{consultant.city}</p>
            <p>{consultant.Desc}</p>

          </div>);
      })}
    </div>
  );
};

export default Consultant;
