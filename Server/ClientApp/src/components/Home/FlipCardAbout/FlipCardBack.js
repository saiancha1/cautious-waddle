import React, { Component } from 'react';
import '../FlipStyle.css';
import '../FlipStyleSass.scss';

// About card
export default class CardBack extends Component {
  render() {
    return (
      <div className="card-side side-back">
        <div className="container-fluid">
          <p>
          We are a group of enthusiast professionals with a background in IT,
          or a related discipline, whose mission is to connect the technology
          companies/professionals in Palmerston North and start collaborating
          together. If youd like to get in touch you can reach us via the
          Contact page.
          </p>
        </div>
      </div>
    );
  }
}
