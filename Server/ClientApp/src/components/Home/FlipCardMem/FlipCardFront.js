import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import '../FlipStyle.css';
import '../FlipStyleSass.scss';

// Info on members
export default class CardFront extends Component {
  render() {
    return (
      <div className="card-side side-front">
        <div className="container-fluid container-front">
          <div>
            <FontAwesomeIcon className="fa-icon" icon={faBuilding} />
          </div>
          <div>
            <h3>Members</h3>
          </div>
        </div>
      </div>
    );
  }
}
