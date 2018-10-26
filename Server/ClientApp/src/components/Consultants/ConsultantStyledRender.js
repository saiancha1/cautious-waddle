import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import {
  Card, CardBody, CardHeader,
} from 'react-simple-card';
import '../consultants.css';

// This component styles the mapped output from the consultant.js component
export default class ConST extends Component {
  render() {
    return (
      <Col md={4} lg={3}>
        <Card className="consult-card-container">
          <CardBody className="consult-card-body">
            <div className="consult-card-img-container">
              <img className="consult-card-img" alt="profile pic" src={this.props.consultimage} />
            </div>
            <h3>
              {this.props.firstName}
              {' '}
              {this.props.lastName}
              {' '}
            </h3>
            <p>
              {this.props.consultDescription}
            </p>
            <ul>
              <li>
                <label>Speciality:</label>
                {this.props.speciality}
              </li>
              <li>
                <label>City:</label>
                {this.props.consultcity}
              </li>
              <li>
                <label>Country:</label>
                {this.props.nation}
              </li>
              <li>
                <label>Website:</label>
                <a href={this.props.consultwebsite}>{this.props.consultwebsite}</a>
              </li>
              <li>
                <label>Email:</label>
                {this.props.consultemail}
              </li>
            </ul>
            <div>
              {this.props.canEdit}
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}
