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
          We various services via this site such as - company, consultant & job
          listings. As well as Summer internships local events/meet up listings
          and a subscription mailing list. Check out the site for more info.
          </p>
        </div>
      </div>
    );
  }
}
