import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import ConST from './ConsultantStyledRender';

const Consultant = (props) => {
  const consultantz = props.cl.map(con => (
    <ConST
      consultimage={con.imageurl}
      firstName={con.firstName}
      lastName={con.lastName}
      consultDescription={con.consultantDesc}
      hisemail={con.email}
      consultcity={con.city}
      consultwebsite={con.website}
    />
  ), // <h1> {con.firstName} {con.lastName}</h1>
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
