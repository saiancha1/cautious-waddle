import React, { Fragment } from 'react';
import ConST from './ConsultantStyledRender';

const Consultant = (props) => {
  const consultantz = props.cl.map((con) => 
    <ConST consultimage={con.imageurl} firstName= {con.firstName} lastName={con.lastName}  consultDescription={con.consultantDesc} 
    hisemail={con.email} consultcity={con.city} consultwebsite={con.website}
       />
    // <h1> {con.firstName} {con.lastName}</h1>
  );
  return (
      <div className="row">
      {consultantz}
      </div>
  );
};

export default Consultant;
