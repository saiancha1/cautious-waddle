import React, { Component } from 'react';
import Geocode from 'react-geocode';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: `${this.props.company.address1}, ${this.props.company.suburb}`,
      zoom: 10,
      center: {
        lat: -40.3,
        lng: 175.6,
      },

    };
  }

  componentDidMount() {
    this.getLatLong(this.state.address);
  }

  getLatLong(address) {
    Geocode.setApiKey('AIzaSyDcEb-gfVWmcT1ek-MDYS_mOnvBzNVZqyI');
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ center: { lat, lng } });
      },
      (error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          className="company-map"
          bootstrapURLKeys={{ key: 'AIzaSyDcEb-gfVWmcT1ek-MDYS_mOnvBzNVZqyI' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <Marker
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text={this.props.company.companyName}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
