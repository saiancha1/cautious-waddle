import React, { Component } from 'react';
import '../FlipStyle.css';
import '../FlipStyleSass.scss';

// Info on members
export default class CardBack extends Component {
  render() {
    return (
      <div className="card-side side-back">
        <div className="container-fluid">
          <p>
          We are affiliated with IT Professionals NZ who provide various services and activities to their members.
          ITP membership provides professional recognition and a range of free and subsidised services designed
          to support professional development.
          </p>
        </div>
      </div>
    );
  }
}
