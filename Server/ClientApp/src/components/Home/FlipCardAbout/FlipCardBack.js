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
          The purpose of this website is to showcase and to promote what the city has to offer when it comes to local tech capabilities and events.
As you’ll see from the website there are a number of technology companies and tech-related events in Palmerston North already but we are always keen to add more.

If you’re in Palmerston North and have an IT/tech-related business, or if you’re an IT consultant we’d love to have you listed on our site.

All you need to do is register via the login screen and add your company or add yourself as a consultant.


          </p>
        </div>
      </div>
    );
  }
}
