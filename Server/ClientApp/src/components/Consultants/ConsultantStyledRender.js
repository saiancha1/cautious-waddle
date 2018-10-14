import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import AuthService from '../Authentication/AuthService';

this.Auth = new AuthService();

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 350,
  },
};

this.handleDelete = (e) => {
  const connerId = e.target.value;
  console.log(connerId);

  const res = () => fetch('api/Consultants/removeConsultant', {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.Auth.getToken()}`,
    },
    body: JSON.stringify({

      consultantId: '79',
    }),
  });
    // .then(res.json());
  res();
};

const ConST = (props) => {
  const { classes } = props;
  return (
    <div className="col-md-3">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.consultimage}
          title={props.lastName}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h4">
            {props.firstName}
            {' '}
            {props.lastName}
            {' '}
            {props.conID}
            {' '}
            {props.nation}
          </Typography>
          <Typography gutterBottom variant="headline" component="h2">
            {props.consultwebsite}
          </Typography>
          <br />
          <Typography component="p" noWrap="true" paragraph="true">
            {props.consultDescription}
          </Typography>
          <Typography component="p" noWrap="true" paragraph="true">
            {props.hisemail}
          </Typography>
        </CardContent>
        <button name="consultantId" value={props.conID} onClick={this.handleDelete}>DELETE</button>
      </Card>

    </div>

  );
};

ConST.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConST);
