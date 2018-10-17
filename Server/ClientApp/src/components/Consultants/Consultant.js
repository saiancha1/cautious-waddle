import React from 'react';
import { connect } from 'react-redux';
import ConST from './ConsultantStyledRender';


// const userCanEdit = (con) => {
//   const authService = new AuthService();
//   if (authService.loggedIn()) {
//     const token = authService.getProfile();
//     const userId = token.id;
//     for (let i = 0; i < con.users.length; i++) {
//       if (con.users[i].id == userId) {
//         return true;
//       }
//       // Do something
//     }
//   }   else   {
//     return false;
//   }
// };


const Consultant = (props) => {
  const consultantz = props.cl.map(con => (
    <ConST
      consultimage={con.imageURL}
      firstName={con.firstName}
      lastName={con.lastName}
      consultDescription={con.consultantDesc}
      hisemail={con.email}
      consultcity={con.city}
      consultwebsite={con.website}
      conID={con.consultantId}
      nation={con.country}
      // canEdit={userCanEdit(con)}

    />
  ),
  );
  return (
    <div className="row">
      {consultantz}
    </div>
  );
};

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Consultant);
