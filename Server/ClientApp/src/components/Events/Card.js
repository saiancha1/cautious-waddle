import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import '../Home/HomeFolder.css';
import './events-folder.css';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  },
};

class ImgMediaCard extends Component {
  // Extracts month from datetime and converts to month name
  getMonth() {
    const { event } = this.props;
    const month = [];
    month[0] = 'JAN';
    month[1] = 'FEB';
    month[2] = 'MAR';
    month[3] = 'APR';
    month[4] = 'MAY';
    month[5] = 'JUN';
    month[6] = 'JUL';
    month[7] = 'AUG';
    month[8] = 'SEP';
    month[9] = 'OCT';
    month[10] = 'NOV';
    month[11] = 'DEC';
    let m = new Date(event.startDate);
    m = month[m.getMonth()];
    return (m);
  }

  // Extracts date from datetime
  getDay() {
    const { event } = this.props;
    const d = new Date(event.startDate);
    return (d.getDate());
  }

  // Converts datetime to date string
  getFullDate() {
    const { event } = this.props;
    const d = new Date(event.startDate);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const hour = d.toLocaleString('en-US', options);
    return (`${d.toDateString()}, ${hour}`);
  }

  render() {
    const { classes, event } = this.props;
    return (
      <Link className="card-link" to={{ pathname: '/events', state: { feature: event } }}>
        <div className="individual-card individual-card-event ">
          <Card className={classes.card}>
            <CardActionArea className="card-action">
              <div className="card-date">
                <span className="card-date-day">{this.getDay()}</span>
                <br />
                <span className="card-date-date">{this.getMonth()}</span>
              </div>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                className={classes.media}
                height="140"
                image={event.imageURL}
                title="temp event"
              />
              <CardContent className="card-content">
                <Typography className="full-date">
                  {this.getFullDate()}
                </Typography>
                <Typography className="event-title" gutterBottom component="h2">
                  {event.eventName}
                </Typography>
                <Typography className="event-host" component="p">
                Hosted by
                  <span>
                    {' '}
                    {event.hostedBy}
                  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Link>
    );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};


export default withStyles(styles)(ImgMediaCard);
