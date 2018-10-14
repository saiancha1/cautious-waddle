import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import AuthService from '../Authentication/AuthService';

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.state = {
      eventName: '',
      eventDescription: '',
      eventLocation: '',
      eventType: null,
      startDate: new Date(),
      startTime: '7:00',
      contact: '',
      website: null,
      duration: 1,
      recurring: null,
      hostedBy: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeDate = date => this.setState({ startDate: date })

  onChangeTime = time => this.setState({ startTime: time })

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    alert(`An essay was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    const {
      eventName, eventDescription, eventLocation, eventType,
      startDate, startTime, contact, website, duration, recurring, hostedBy,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
          Event Name
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
          Description
            <textarea
              name="eventDescription"
              value={eventDescription}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
          Location
            <input
              type="text"
              name="eventLocation"
              value={eventLocation}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
          Type Of Event
            <select
              name="eventType"
              value={eventType}
              onChange={this.handleChange}
              required
            >
              <option value="Event">Event</option>
              <option value="Meetup">Meet Up</option>
              <option value="Group">Group</option>
              <option value="Course">Course</option>
            </select>
          </label>
          <label>
            Date
            <DatePicker
              name="startDate"
              onChange={this.onChangeDate}
              value={startDate}
              required
            />
          </label>
          <label>
          Contact
            <textarea
              name="contact"
              value={contact}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
          Website
            <textarea
              name="website"
              value={website}
              onChange={this.handleChange}
              required
            />
          </label>
          <label>
          Start Time
            <TimePicker
              onChange={this.onChangeTime}
              value={startTime}
              disableClock="true"
            />
          </label>


        </form>
      </div>
    );
  }
}
