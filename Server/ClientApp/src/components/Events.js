import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Card from './Events/Card';
import AuthService from './Authentication/AuthService';
import eventImage from '../images/hall-meeting.jpg';
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
          <div className="event-image-container">
            <img className="event-image" src={eventImage} alt="Hall filled with people" />
            <div className="event-welcome">
              <h1>Events</h1>
              <h2>
              Find out whats happening in tech
                {' '}
                <br />
              around Palmerston North and start
                {' '}
                <br />
              meeting like-minded people.
              </h2>
            </div>
          </div>

        </div>
        <div className="event-filter">
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
        <div className="add-event-wrapper">
          <button type="submit" className="add-event" onClick={this.handleAddEvent}>

            <h4>
              <FontAwesomeIcon className="fa-plus" icon={faPlusCircle} />
                 Add your own
            </h4>
          </button>
        </div>
        {feature !== 'none' ? (
          <div className="event-grid-container">
            <div className="event-grid-item event-grid-image">
              <img className="event-image" src={feature.imageURL} alt="event" />
            </div>
            <div className="event-grid-item event-headings">
              <h2>{feature.eventName}</h2>
              <h2>{feature.startDate}</h2>
              <h2>{feature.eventLocation}</h2>
              <h2>{feature.hostedBy}</h2>
              <h2>{feature.website}</h2>
              <h2>{feature.contact}</h2>
            </div>
            <div className="event-grid-item event-desc">
              <p>{feature.eventDescription}</p>
            </div>
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
