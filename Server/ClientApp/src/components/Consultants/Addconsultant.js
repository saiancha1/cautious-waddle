import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthService from '../Authentication/AuthService';
import StandardButton from './StandardButton';
import SimplePopper from './Popper';
// import Popper from './Popper';


class Addconsultant extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      loginStatus: this.Auth.loggedIn(),
    };
  }

  render() {
    return (
      <div>
        {this.state.loginStatus ? (
          <Link to="/addconsultant">
            <StandardButton />

          </Link>
        ) : (<SimplePopper />) }

      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Addconsultant);
