import React, { Component } from 'react';
import Geocode from 'react-geocode';
import GoogleMapReact from 'google-map-react';

const Marker = ({ address }) => <div>{address}</div>;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: `${this.props.company.address1}, ${this.props.company.suburb}`,
      zoom: 12,
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
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDcEb-gfVWmcT1ek-MDYS_mOnvBzNVZqyI' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <Marker
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text={this.state.address}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
