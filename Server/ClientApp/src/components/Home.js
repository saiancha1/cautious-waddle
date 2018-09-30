import React, { Component } from 'react';
import background from '../images/homepage-image.jpg';

class Home extends Component {
  render() {
    return (
      <img src={background} alt="background" />
    );
  }
}

export default Home;
