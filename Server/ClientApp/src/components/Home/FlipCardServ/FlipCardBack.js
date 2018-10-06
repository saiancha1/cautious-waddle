import React, { Component } from 'react';
import '../FlipStyle.css';
import '../FlipStyleSass.scss';

// Info on services
export default class CardFront extends Component {
  render() {
    return (
      <div className="card-side side-back">
        <div className="container-fluid">
          <p>
            It is a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of using Lorem
            Ipsum is that it has a more-or-less normal distribution of letters.
          </p>
        </div>
      </div>
    );
  }
}
