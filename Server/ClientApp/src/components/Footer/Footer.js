import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import logo from '../../images/logoV2.png';
import './Footer.css';

const Footer = () => (
  <Router>
    <Grid fluid className="footer navbar-fixed-bottom">
      <Row className="footer-row">
        <Col sm="6">
          <div className="foot-img-container">
            <img className="footer-logo" src={logo} alt="logo" />
          </div>
        </Col>
        <Col sm="6">
          <ul className="foot-link-container">
            <li>
              <Link exact to="/">Home</Link>
            </li>
            <li>
              <Link exact to="/contact">Contact</Link>
            </li>
            <li>
              <a href="https://itp.nz">IT Professionals</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col className="footer-bottom" sm="12">
          &copy; 2018 Tech Palmy
        </Col>
      </Row>
    </Grid>
  </Router>
);

export default Footer;
