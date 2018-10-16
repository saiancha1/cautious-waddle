import React, { Fragment, Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AuthService from '../Authentication/AuthService';


const styles = {
  card: {
    maxWidth: 345,
    margin: 10,
  },
  media: {
    height: 350,
  },
};

class ConST extends Component {
  constructor(props) {
    super(props);
  }

  Auth = new AuthService();

  handleDelete = (e) => {
    const connerId = e.target.value;
    console.log(connerId);

    const res = () => fetch('api/Consultants/removeConsultant', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.Auth.getToken()}`,
      },
      body: connerId,
    });
      // .then(res.json());
    res();
  };


  render() {
    const { classes } = this.props;
    return (
      // console.log(status),
      <div className="col-md-3">
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.consultimage}
            title={this.props.lastName}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h4">
              {this.props.firstName}
              {' '}
              {this.props.lastName}
              {' '}
              {/* {props.conID}
            {' '}
            {props.nation} */}
            </Typography>
            <Typography gutterBottom variant="headline" component="h3">
              {this.props.consultwebsite}
            </Typography>
            <br />
            <Typography component="p" noWrap="true" paragraph="true">
              {this.props.consultDescription}
            </Typography>
            <Typography>
              {' '}
            Based in
              {' '}
              {this.props.nation}
              {' '}
              {' '}

            </Typography>
            <Typography component="p" noWrap="true" paragraph="true">
              {this.props.hisemail}
            </Typography>
          </CardContent>
          <div>
            {this.Auth.loggedIn() ? (<Button name="consultantId" value={this.props.conID} onClick={this.handleDelete}>DELETE</Button>) : (<div />) }
          </div>
        </Card>

      </div>

    );
  }
}


export default withStyles(styles)(ConST);
