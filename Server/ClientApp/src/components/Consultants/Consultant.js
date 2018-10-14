import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ConST from './ConsultantStyledRender';

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
