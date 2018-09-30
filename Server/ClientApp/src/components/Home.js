import React, { Component } from 'react';
import background from '../images/homepage-image.jpg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <img className="background-image" src={background} alt="background" />
        <div className="centered-text">
          <h3>This is some text in the middle of image</h3>
        </div>
      </div>
    );
  }
}

export default Home;
