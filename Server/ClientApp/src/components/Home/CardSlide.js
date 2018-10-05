import React, { Component } from 'react';
import Slider from 'react-slick';
import Card from './Card';
import './HomeFolder.css';

// const events = [{
//   id: 1,
//   title: 'Meet tech man',
//   info: 'meet the man himself',
//   date: '3/9/18',
// }, {
//   id: 2,
//   title: 'Hot to give up Microsoft',
//   info: 'Learn how to stop using Microsoft',
//   date: '10/9/18',
// }, {
//   id: 3,
//   title: 'AI Today',
//   info: 'Talk to a Robto',
//   date: '7/2/18',
// },
// {
//   id: 4,
//   title: 'Meet tech man',
//   info: 'meet the man himself',
//   date: '3/9/18',
// }, {
//   id: 5,
//   title: 'Hot to give up Microsoft',
//   info: 'Learn how to stop using Microsoft',
//   date: '10/9/18',
// }, {
//   id: 6,
//   title: 'AI Today',
//   info: 'Talk to a Robto',
//   date: '7/2/18',
// },
// ];

export default class CardSlide extends Component {
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
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      arrows: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    console.log(this.state.events);
    return (
      <div className="slide-div">
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <h2>Upcoming Events</h2>
        <Slider className="slider-cards" {...settings}>
          {this.state.events.map(event => (
            <div key={event.eventId}>
              <Card event={event} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
