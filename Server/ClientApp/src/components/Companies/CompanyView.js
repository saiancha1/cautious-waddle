import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Modal, Button } from 'react-bootstrap';
import './companyStyles.css';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} from 'react-google-maps';
import Geocode from 'react-geocode';
import Map from './Map';


const CompanyView = (props) => {
  const company = props.companyToRender;
  const address = `${company.address1}, ${company.suburb}`;

  return (

    <Modal show={props.companyOpen} onHide={props.handleClose} bsSize="lg">

      <Modal.Header>
        <Modal.Title>
          <img className="media-object" src={company.logo} />
          {company.companyName}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div dangerouslySetInnerHTML={props.generateDesc} />
        <br />
        <div>
          <b>Size: </b>
          {' '}
          {company.size}
          {' '}
          <br />
          <b>Area: </b>
          {' '}
          {company.businessType}
          {' '}
          <br />
        </div>
        <br />
        <div>
          <h3>Contact Information</h3>
          <b>Email: </b>
          {' '}
          {company.email}
          <br />
          <div>
            {/* {this.map} */}
            <Map company={props.companyToRender} />
          </div>

        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal.Footer>

    </Modal>

  );
};
export default CompanyView;
