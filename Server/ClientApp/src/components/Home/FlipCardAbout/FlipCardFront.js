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
            This is a short paragraph introducing the copy on the back.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
