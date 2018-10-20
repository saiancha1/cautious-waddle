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
      event: {
        eventName: '',
        eventDescription: '',
        eventLocation: '',
        eventType: null,
        startDate: new Date(),
        startTime: '7:00',
        contact: '',
        website: null,
        duration: 1,
        hostedBy: '',
        logo: '',
      },
      file: null,
      imageUploaded: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAddEventSubmit = this.handleAddEventSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleImageUpload = (e) => {
    const data = new FormData();
    const file = this.state.file;
    data.append('file', file);
    e.preventDefault();
    fetch('api/events/addEventImage', { // Your POST endpoint
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/formdata',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
      body: data, // This is your file object
    }).then(
      response => response.json(), // if the response is a JSON object
    ).then((res) => {
      const event = this.state.event;
      event.logo = res.imageUrl;
      this.setState({ event });
      this.setState({ imageUploaded: true });
      // Handle the success response object
    },
    ).catch(
      error => console.log(error), // Handle the error response object
    );
  }

  handleAddEventSubmit = () => {
    const event = this.state.event;
    if (event.eventId !== null) {
      fetch('api/events/editevent', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          'content-Type': 'application/json',
        },
        body: JSON.stringify(event),

      })
        .then((response) => { (response.status === 200) ? this.hide() : alert('fail1'); })
        .catch();
    } else {
      fetch('api/events/addevent', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          'content-Type': 'application/json',
        },
        body: JSON.stringify(event),

      })
        .then((response) => { (response.status === 200) ? this.setState({ redirect: true }) : alert('fail1'); })
        .catch();
    }
  }

  onChangeDate = date => this.setState({ startDate: date })

  onChangeTime = time => this.setState({ startTime: time })

  onChangeDur = dur => this.setState({ duration: dur })

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const {
      eventName, eventDescription, eventLocation, eventType,
      startDate, startTime, contact, website, duration, hostedBy,
    } = this.state;
    return (
      <div className="event-form">
        <div className="event-add-blurb">
          <h2>List Your Own Event</h2>
          <p>This is a paragraph about how great it would be to post your own event, meet up, group or course!</p>
        </div>
        <form onSubmit={this.handleAddEventSubmit}>
          <label>Event Name</label>
          <div>
            <input
              className="event-input"
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
              className="event-input"
              name="eventDescription"
              value={eventDescription}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Hosted By</label>
          <div>
            <input
              className="event-input"
              name="hostedBy"
              value={hostedBy}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Location</label>
          <div>
            <input
              className="event-input"
              type="text"
              name="eventLocation"
              value={eventLocation}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Contact</label>
          <div>
            <textarea
              className="event-input"
              name="contact"
              value={contact}
              onChange={this.handleChange}
              required
            />
          </div>
          <label>Website</label>
          <div>
            <textarea
              className="event-input"
              name="website"
              value={website}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="event-date-group">
            <div className="time-picker">
              <label>Time</label>
              <TimePicker
                onChange={this.onChangeTime}
                value={startTime}
                disableClock="true"
                required
              />
            </div>
            <div className="date-picker">
              <label>Date</label>
              <DatePicker
                name="startDate"
                onChange={this.onChangeDate}
                value={startDate}
                required
              />
            </div>
            <div>
              <label>Days</label>
              <NumericInput
                className="event-NumericInput"
                min={1}
                max={20}
                name="duration"
                value={duration}
                onChange={this.onChangeDur}
                required
              />
            </div>
          </div>
          <label>Type Of Event</label>
          <div>
            <select
              className="event-type"
              name="eventType"
              value={eventType}
              onChange={this.handleChange}
              required
            >
              <option className="event-type" value="Event">Event</option>
              <option value="Meetup">Meet Up</option>
              <option value="Group">Group</option>
              <option value="Course">Course</option>
            </select>
          </div>
          <label className="event-upload">
            Upload Event Image
          </label>
          <input className="event-logo-upload" type="file" onChange={this.handleImageUpload} />
          <input className="event-submit" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
