import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../Home/HomeFolder.css';

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
    console.log(event);
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <div className="individual-card">
            <Card className={classes.card}>
              <CardActionArea>
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
                  image={event.imageURL} // FIXME: im using a temp image here because API url was not working - event.imageURL.
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
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Link to={{ pathname: '/events', state: { foo: event } }}>Events</Link>

        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};


export default withStyles(styles)(ImgMediaCard);
