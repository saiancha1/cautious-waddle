import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from './Home/Card';
import './events.css';

export default class Events extends Component {
  state = {
    events: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch('api/events/getEvents');
      const events = await res.json();

      this.setState({
        events,
      });
    } catch (e) {
      console.log(e); // TODO: Add proper error hanlding here
    }
  }

  render() {
    return (
      <div>
        <div className="events-container">
          {/* <img className="background-image" src={background} alt="background" /> */}
          <div className="">
            <h3>
              <span>Events</span>
              <br />
              Find out whats happening in technology around Palmerston North and start meeting like-minded people.
            </h3>
          </div>
        </div>
        <div className="event-grid">
          {this.state.events.map(event => (
            <div className="grid-item" key={event.eventId}>
              <Card event={event} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
