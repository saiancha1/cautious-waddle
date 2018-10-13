import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from './Events/Card';
import './events.css';

export default class Events extends Component {
  constructor(props) {
    super(props);

    this.props.location.state = {
      foo: 'nahh',
    };

    this.state = {
      events: [],
      eventsSelected: [],
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    try {
      const res = await fetch('api/events/getEvents');
      const events = await res.json();

      this.setState({
        events,
        eventsSelected: events,
      });
    } catch (e) {
      console.log(e); // TODO: Add proper error hanlding here
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  handleFilterEvent(param) {
    const { events } = this.state;
    if (param === 'all') {
      this.setState({ eventsSelected: events });
    } else {
      const newArr = events.filter(event => event.eventType === param);
      this.setState({ eventsSelected: newArr });
    }
  }

  render() {
    const { foo } = this.props.location.state;
    console.log(foo);
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
        <div>
          <button type="submit" onClick={this.handleFilterEvent.bind(this, 'Course')}>
            Course
          </button>
          <button type="submit" onClick={this.handleFilterEvent.bind(this, 'Meetup')}>
            MeetUp
          </button>
          <button type="submit" onClick={this.handleFilterEvent.bind(this, 'Group')}>
            Group
          </button>
          <button type="submit" onClick={this.handleFilterEvent.bind(this, 'Event')}>
            Event
          </button>
          <button type="submit" onClick={this.handleFilterEvent.bind(this, 'all')}>
            All
          </button>
          {foo !== 'nahh' ? (<h3>{foo.eventName}</h3>) : (<h1>no</h1>)}

        </div>
        <div className="event-grid">
          {this.state.eventsSelected.map(event => (
            <div className="grid-item" key={event.eventId}>
              <Card event={event} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
