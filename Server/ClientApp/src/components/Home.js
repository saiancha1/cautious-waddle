import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FlipCard from './Home/FlipCard';
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
        <h3>About Us</h3>
        <Grid>
          <Row className="show-grid">
            <Col xs={12} md={4}>
              <FlipCard />
            </Col>
            <Col xs={12} md={4}>
              <FlipCard />
            </Col>
            <Col xs={12} md={4}>
              <FlipCard />
            </Col>
          </Row>
        </Grid>
        <div className="cardSlide-wrapper">
          <CardSlide />
        </div>
      </div>
    );
  }
}

export default Home;
