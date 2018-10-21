import React from 'react';
import grey from '@material-ui/core/colors/grey';
import ConST from './ConsultantStyledRender';
import AuthService from '../Authentication/AuthService';
import Editz from './Editz';

const mygrey = grey[700];


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
          {/* <Row> */}
          {/* <Button onClick={handleEdit} value={con.consultantId}>Edit This Consultant</Button> */}
          {/* <Button size="small" variant="contained" onClick={handleDelete} value={con.consultantId}>Delete</Button> */}
          <Editz
            consultimage={con.imageURL}
            conID={con.consultantId}
            firstName={con.firstName}
            lastName={con.lastName}
            consultDescription={con.consultantDesc}
            speciality={con.specialistArea}
            consultwebsite={con.website}
            consultemail={con.email}
            phone={con.phone}
            addy1={con.address1}
            addy2={con.address2}
            sub={con.suburb}
            pCode={con.postalCode}
            consultcity={con.city}
            nation={con.country}
          />
          {/* </Row> */}
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
      consultemail={con.email}
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
