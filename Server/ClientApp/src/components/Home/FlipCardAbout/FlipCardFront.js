import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../FlipStyle.css';
import '../FlipStyleSass.scss';

// About card
export default class CardFront extends Component {
  render() {
    return (
      <div className="card-side side-front">
        <div className="container-fluid container-front">
          <div>
            <FontAwesomeIcon className="fa-icon" icon={faInfoCircle} />
          </div>
          <div>
            <h3>About</h3>
            <p>
            We are a group of enthusiast professionals with a background
            in IT, or a related discipline, whose mission is to connect the
            technology companies/professionals in Palmerston North and
            start collaborating together.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
