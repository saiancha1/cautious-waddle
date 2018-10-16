import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Card from './Events/Card';
import AuthService from './Authentication/AuthService';
import './events.css';


export default class Events extends Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();

    this.props.location.state = {
      feature: 'none',
    };

    this.state = {
      events: [],
      eventsSelected: [],
      loggedIn: this.Auth.loggedIn(),
    };

    this.handleAddEvent = this.handleAddEvent.bind(this);
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
    this.props.location.state = {
      feature: 'none',
    };
    const { events } = this.state;
    if (param === 'all') {
      this.setState({ eventsSelected: events });
    } else {
      const newArr = events.filter(event => event.eventType === param);
      this.setState({ eventsSelected: newArr });
    }
  }

  handleAddEvent() {
    this.setState({ loggedIn: this.Auth.loggedIn() });
    const { loggedIn } = this.state;
    if (loggedIn) {
      this.props.history.push('events/add');
    } else {
      alert('To add your own please log in or create an account ');
    }
  }

  render() {
    const { feature } = this.props.location.state;

    console.log(this.state.loggedIn);

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
        </div>
        <button type="submit" className="add-event" onClick={this.handleAddEvent}>
          <FontAwesomeIcon className="fa-plus" icon={faPlusCircle} />
          <h4>Add your own</h4>
        </button>
        {feature !== 'none' ? (
          <div>
            <h2>{feature.eventName}</h2>
            <br />
            <h3>{feature.eventDescription}</h3>
            <br />
            <h3>{feature.eventLocation}</h3>
          </div>
        ) : ('')}
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
