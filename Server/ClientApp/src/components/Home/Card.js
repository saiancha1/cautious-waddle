import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import tempImage from '../../images/temp-event.jpg';

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
    month[0] = 'Jan';
    month[1] = 'Feb';
    month[2] = 'Mar';
    month[3] = 'Apr';
    month[4] = 'May';
    month[5] = 'Jun';
    month[6] = 'Jul';
    month[7] = 'Aug';
    month[8] = 'Sep';
    month[9] = 'Oct';
    month[10] = 'Nov';
    month[11] = 'Dec';
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

  render() {
    const { classes, event } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <div>
            {this.getDay()}
            <br />
            {this.getMonth()}
          </div>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            className={classes.media}
            height="140"
            image={tempImage} // FIXME: im using a temp image here because API url was not working - event.imageURL.
            title="temp event"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {event.eventName}
            </Typography>
            <Typography component="p">
              {event.eventDescription}
              {event.startDate}
              {event.eventLocation}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
          Find out more
          </Button>
        </CardActions>
      </Card>
    );
  }
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);
