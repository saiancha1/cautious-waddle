import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import NumericInput from 'react-numeric-input';
import AuthService from '../Authentication/AuthService';
import './events.css';


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
          <label>Event Name</label>
          <div>
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Description</label>
          <div>
            <textarea
              name="eventDescription"
              value={eventDescription}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Hosted By</label>
          <div>
            <input
              name="hostedBy"
              value={hostedBy}
              onChange={this.handleChange}
              required
            />
          </div>       
          <label>Location</label>
          <div>
            <input
              type="text"
              name="eventLocation"
              value={eventLocation}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Type Of Event</label>
          <div>
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
          </div>
          <label>Date</label>
          <div>
            <DatePicker
              name="startDate"
              onChange={this.onChangeDate}
              value={startDate}
              required
            />
          </div>
          <label>Contact</label>
          <div>
            <textarea
              name="contact"
              value={contact}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Website</label>
          <div>
            <textarea
              name="website"
              value={website}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Start Time</label>
          <div>
            <TimePicker
              onChange={this.onChangeTime}
              value={startTime}
              disableClock="true"
              required
            />
          </div>
          {/* <label>Is The Event Longer Than One Day?</label>
          <div>
            <select
              name="durationBool"
              value={durationBool}
              onChange={this.handleChange}
              required
            >
              <option selected value={false}>No</option>
              <option>Yes</option>
            </select>
          </div> */}
          <label>Number Of Days</label>
          <div>
            <NumericInput
              min={0}
              max={20}
              name="duration"
              value={duration}
              onChange={this.onChangeDur}
            />
          </div>
        </form>
      </div>
    );
  }
}
