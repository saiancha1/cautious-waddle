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
          We offer various services via this site such as listings for companies, consultants, jobs & summer internships.
          We also provide listings of local events/meet-ups and a subscription mailing list. Check out the site for more info.
          </p>
        </div>
      </div>
    );
  }
}
