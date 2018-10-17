import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import NumericInput from 'react-numeric-input';
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
      durationBool: false,
      duration: 1,
      recurring: null,
      hostedBy: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChangeDate = date => this.setState({ startDate: date })

  onChangeTime = time => this.setState({ startTime: time })

  onChangeDur = dur => this.setState({ duration: dur })

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    alert(`An essay was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    const {
      eventName, eventDescription, eventLocation, eventType, durationBool,
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
          Hosted By
            <input
              name="hostedBy"
              value={hostedBy}
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
              required
            />
          </label>
          <label>
          Is The Event Longer Than One Day?
            <select
              name="durationBool"
              value={durationBool}
              onChange={this.handleChange}
              required
            >
              <option selected value={false}>No</option>
              <option>Yes</option>
            </select>
          </label>
          <label>
          Number Of Days
            <NumericInput
              min={0}
              max={20}
              name="duration"
              value={duration}
              onChange={this.onChangeDur}
            />

          </label>
        </form>
      </div>
    );
  }
}
