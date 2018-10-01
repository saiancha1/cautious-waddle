import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Modal,Button} from 'react-bootstrap';
import './companyStyles.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";


const CompanyView = (props) => {
    let company = props.companyToRender;
    let address = company.address1 + ', ' + company.suburb;
    console.log(company.address1 + company.address2);
    let lat;
    let lng;
    Geocode.setApiKey("AIzaSyDcEb-gfVWmcT1ek-MDYS_mOnvBzNVZqyI");
    Geocode.fromAddress(address).then(
      response => {
        const {lat, lng} = response.results[0].geometry.location;
        this.lat = lat;
        this.lng = lng;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: this.lat, lng: this.lng } }
        defaultZoom = { 13 }
      >
      <Marker
      position={{ lat: this.lat, lng: this.lng }}
    />
      </GoogleMap>
   ));

    return (
        
        <Modal show={props.companyOpen} onHide={props.handleClose} bsSize="lg">
        
          <Modal.Header>
            <Modal.Title>
            <img className="media-object" src={company.logo}/>{company.companyName}
            </Modal.Title>
          </Modal.Header>
      
          <Modal.Body>
            <div>
          {company.companyDesc}
          </div>
          <br/>
          <div>
            <b>Size: </b> {company.size} <br/>
            <b>Area: </b> {company.businessType} <br/>            
          </div>
          <br/>
          <div>
            <h3>Contact Information</h3>
            <b>Email: </b> {company.email}<br/>
            <div >
            <GoogleMapExample
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `80%` }} lat = {this.lat} lng = {this.lng}/> }
        />
        </div>

          </div>
          </Modal.Body>
      
          <Modal.Footer>
            <Button onClick={props.handleClose}>Close</Button>
          </Modal.Footer>
        
        </Modal>
        
    )
}
export default CompanyView;
