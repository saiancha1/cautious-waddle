import React from 'react';
import Button from '@material-ui/core/Button';
import ConST from './ConsultantStyledRender';
import AuthService from '../Authentication/AuthService';
import Editz from './Editz';


this.Auth = new AuthService();

const handleNoDelError = (e) => {
  try {
    alert('Cannot Delete right now. Try Again Later, or Contact Support. Thank you.');
  } catch (e) {
    alert('There seems to be a problem!');
  }
};

const handleDelMsg = (e) => {
  alert('The selected Consultant has been Deleted.');
};

// const handleNoEditMsg = (e) => {
//   alert('Cannot Edit Right Now, Please Try Again.');
// };

// const handleEdit = (e) => {
//   const connyId = e.target.value;
//   console.log(connyId);

//   if (connyId == undefined) {
//     // console.log('undefined consultant ID');
//     handleNoEditMsg();
//   } else {
//     console.log('finally  NUMBER');
//     console.log(connyId);
//     return connyId;

//     // return <div><EditConsultant theID={connyId} /></div>;
//   }
// };

const handleDelete = (e) => {
  const connerId = e.target.value;
  console.log(connerId);

  const res = () => {
    try {
      fetch('api/Consultants/removeConsultant', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.Auth.getToken()}`,
        },
        body: connerId,
      });
      handleDelMsg(e);
      window.location.reload();


      // console.log('Delete Successful');
    } catch (error) {
      handleNoDelError(error);
      return null;
    }
  };
  // .then(res.json());
  if (connerId == undefined) {
    handleNoDelError();
  } else {
    res();
  }
};

const userCanEdit = (con) => {
  const authService = new AuthService();
  if (authService.loggedIn()) {
    const token = authService.getProfile();
    const userIdd = token.id;
    // const conID = con.consultantId;
    if (con.userId == userIdd) {
      // console.log(con.userId);

      return (
        <div>
          {/* <Button onClick={handleEdit} value={con.consultantId}>Edit This Consultant</Button> */}
          <Editz
            consultimage={con.imageURL}
            conID={con.consultantId}
            firstName={con.firstName}
            lastName={con.lastName}
            consultDescription={con.consultantDesc}
            speciality={con.specialistArea}
            consultwebsite={con.website}
            hisemail={con.email}
            phone={con.phone}
            addy1={con.address1}
            addy2={con.address2}
            sub={con.suburb}
            pCode={con.postalCode}
            consultcity={con.city}
            nation={con.country}
          />
          {' '}
          <Button onClick={handleDelete} value={con.consultantId}>Delete Consultant</Button>
        </div>);
    } else {
      return false;
    }
  }
};


const Consultant = (props) => {
  const consultantz = props.cl.map(con => (
    <ConST
      consultimage={con.imageURL}
      conID={con.consultantId}
      firstName={con.firstName}
      lastName={con.lastName}
      consultDescription={con.consultantDesc}
      speciality={con.specialistArea}
      consultwebsite={con.website}
      hisemail={con.email}
      phone={con.phone}
      addy1={con.address1}
      addy2={con.address2}
      sub={con.suburb}
      pCode={con.postalCode}
      consultcity={con.city}
      nation={con.country}

      canEdit={userCanEdit(con)}

    />
  ),
  );

  return (
    <div className="row">
      {consultantz}
    </div>
  );
};

export default Consultant;
