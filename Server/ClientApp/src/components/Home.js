import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FlipCardAbout from './Home/FlipCardAbout/FlipCardAbout';
import FlipCardMem from './Home/FlipCardMem/FlipCardMem';
import FlipCardServ from './Home/FlipCardServ/FlipCardServ';
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
        <Grid className="card-grid">
          <Row className="show-grid flip-cards">
            <Col xs={12} sm={6} md={4}>
              <FlipCardAbout />
            </Col>
            <Col xs={12} sm={6} md={4}>
              <FlipCardMem />
            </Col>
            <Col xs={12} sm={12} md={4}>
              <FlipCardServ />
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
