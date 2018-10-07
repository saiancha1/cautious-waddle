import React, { Component } from 'react';
import CardBack from './FlipCardBack';
import CardFront from './FlipCardFront';
import '../FlipStyle.css';
import '../FlipStyleSass.scss';

export default class FlipCardServ extends Component {
  render() {
    return (
      <div className="card-container">
        <div className="card-body">
          <CardBack />
          <CardFront />
        </div>
      </div>
    );
  }
}
