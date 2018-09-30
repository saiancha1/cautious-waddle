import React, { Component } from 'react';
import background from '../images/homepage-image.jpg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <img className="background-image" src={background} alt="background" />
    );
  }
}

export default Home;
