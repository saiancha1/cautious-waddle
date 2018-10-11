import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import './Footer.css';
import SubscribeForm from '../Subscribe/SubscribeForm';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <Grid>
          <Row>
            <Col className="footer-col-l" xs={6}>
              <a href="/">Something Here</a>
            </Col>
            <Col className="footer-col-r" xs={6}>
            <SubscribeForm/> 
              <a href="/">Another thing</a>
            </Col>
          </Row>
        </Grid>
        <div className="copyright">
          &copy; 2018 Tech Palmy
        </div>
      </div>
    );
  }
}
