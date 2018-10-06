import React, { Component } from 'react';
import background from '../images/homepage-image.jpg';
import CardSlide from './Home/CardSlide';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home-container">
          <img className="background-image" src={background} alt="background" />
          <div className="centered-text">
            <h3>
              <span>Tech Palmy</span>
              <br />
              A showcase of technology in Palmerston North
            </h3>
          </div>
        </div>
        <div className="cardSlide-wrapper">
          <CardSlide />
        </div>
      </div>
    );
  }
}

export default Home;
