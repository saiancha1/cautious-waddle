import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ConST from './ConsultantStyledRender';
import AuthService from '../Authentication/AuthService';
import history from '../history';


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

const handleEdit = (e) => {
  console.log('EDIT SUCCESSFUL');
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
          <Link to="/editcon">
            <Button onClick={handleEdit}>Edit This Consultant</Button>
          </Link>
          {' '}
          <Button onClick={handleDelete} value={con.consultantId}>Delete Consultant</Button>
        </div>);
    } else {
      // console.log('IT DOESN"T WORK');
      return false;
    }
  }
};


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

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Consultant);
