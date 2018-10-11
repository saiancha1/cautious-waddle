import React, { Fragment } from 'react';
import ConST from './ConsultantStyledRender';

const Consultant = (props) => {
  const consultants = props.cl.map((consultant) => 
    <ConST consultimage={consultant.imageurl} firstName= {consultant.firstName} lastName={consultant.lastName}  consultDescription={consultant.consultantDesc} 
    hisemail={consultant.email} consultcity={consultant.city} consultwebsite={consultant.website}
       />
  );
  return (
      <div className="row">
      {consultants}
      </div>
  );
};

export default Consultant;
