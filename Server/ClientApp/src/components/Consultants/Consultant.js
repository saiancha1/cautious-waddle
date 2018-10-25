import React from 'react';
import grey from '@material-ui/core/colors/grey';
import ConST from './ConsultantStyledRender';
import AuthService from '../Authentication/AuthService';
import Editz from './Editz';


this.Auth = new AuthService();

// This function determines whether the user is logged in, and also checks if the user matches the user id
// of the person who created the specific consultant. If so it invokes the Editz component, bby displaying two
// buttons - edit and delete - and passing on props to editz to set up and run the functions for edit and
// delete consultant.
// This is conditional rendering at its finest.

const userCanEdit = (con) => {
  const authService = new AuthService();
  if (authService.loggedIn()) {
    const token = authService.getProfile();
    const userIdd = token.id;
    if (con.userId == userIdd) {
      return (
        <div>

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
    <div className="row consult-grid">
      {consultantz}
    </div>
  );
};

export default Consultant;
