import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Modal,Button} from 'react-bootstrap';
import '../Companies/companyStyles.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Geocode from "react-geocode";


class CompanyModal extends Component {
    state = {
        open: false,
      };
    
    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });

}

    render(){
        const {    
            classes, 
            companyName,
            logo, 
            size,
            businessType,
            specialistArea,
            companyDesc,
            phone,
            email,
            address1,
            address2,
            suburb,
            postalCode,
            city} = this.props;
            return (
                <div>
                <Typography gutterBottom='true' />
                <Button onClick={this.handleOpen}>More Info</Button>
                <Modal show={this.state.open} onHide={this.handleClose} bsSize="lg">
                <Modal.Header>
                    <Modal.Title>
                    <img className="media-object" src={logo}/>{companyName}
                    </Modal.Title>
                </Modal.Header>
            
                <Modal.Body>
                    <div dangerouslySetInnerHTML={this.props.generateDesc}> 
                </div>
                <br/>
                <div>
                    <b>Size: </b> {size} <br/>
                    <b>Area: </b> {businessType} <br/>            
                </div>
                <br/>
                <div>
                    <h3>Contact Information</h3>
                    <b>Email: </b> {email}<br/>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
                </Modal>
            </div>
            );
    }
}

export default CompanyModal;
