import React, { Fragment } from 'react';
import ConST from './ConsultantStyledRender';

// const Consultant = (props) => {
//   return (<Fragment>
//     {props.cl.map(consult => 
//     <p>{consult.consultantDesc}</p>
    
//    )}
//     </Fragment>)}

const Consultant = (props) => {
  const consultants = props.cl.map((consultant) => 
    <ConST firstName={consultant.firstName} lastName={consultant.lastName} consultimage={consultant.imageurl} consultDescription={consultant.consultantDesc} 
    hisemail={consultant.email}
       />
  );
  return (
      <div className="row">
      {consultants}
      </div>
  );
};

export default Consultant;
