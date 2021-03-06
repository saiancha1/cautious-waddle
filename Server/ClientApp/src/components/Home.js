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
          <div className="background-image-container">
            <img className="background-image" src={background} alt="background" />
          </div>
          <div className="centered-text">
            <h3>
              <span>Tech Palmy</span>
              <br />
              A showcase of technology in Palmerston North
            </h3>
          </div>
        </div>
        <div className="about-block">
          <h3 className="home-heading">About Us</h3>
          <div className="about-blurb">
            <hr />
            <h4>
            Tech Palmy aims to showcase and promote what the city has to offer when it comes to
            local tech capabilities and events. As you’ll see from the website there are a number
            of technology companies and tech-related events in Palmerston North already but we are
            always keen to add more.
              <br />
              <br />
              {' '}
            If you’re in Palmerston North and have an IT/tech-related
            business, or if you’re an IT consultant we’d love to have you listed on our site.
              <br />
              <br />
            All you need to do is register via the login screen and add your company or add yourself
            as a consultant.
            </h4>
            <hr />
          </div>
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
        </div>
        <div className="cardSlide-wrapper">
          <CardSlide />
        </div>
      </div>
    );
  }
}

export default Home;
