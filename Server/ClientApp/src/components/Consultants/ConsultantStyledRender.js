import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Col } from 'react-bootstrap';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import red from '@material-ui/core/colors/red';

import AuthService from '../Authentication/AuthService';


const styles = theme => ({

  card: {
    maxWidth: 345,
    height: 600,
    margin: 10,
    padding: 10,

  },
  media: {
    height: 350,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ConST extends Component {
  constructor(props) {
    super(props);
  }

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  Auth = new AuthService();

  // handleDelete = (e) => {
  //   const connerId = e.target.value;
  //   console.log(connerId);

  //   const res = () => fetch('api/Consultants/removeConsultant', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json, text/plain, */*',
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${this.Auth.getToken()}`,
  //     },
  //     body: connerId,
  //   });
  //     // .then(res.json());
  //   res();
  // };


  render() {
    const { classes } = this.props;
    return (
      // console.log(status),
      <div>
        <Col>
          <div className="col-md-3">
            <Card className={classes.card}>
              <Typography variant="headline" color="textPrimary">
                {this.props.firstName}
                {' '}
                {this.props.lastName}
                {' '}
              </Typography>
              <CardMedia
                className={classes.media}
                image={this.props.consultimage}
                title={this.props.lastName}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="h5">
                  {this.props.specialty}
                  {' '}

                </Typography>
                <Typography variant="subtitle2">
                  {this.props.speciality}
                </Typography>
                <Typography variant="button" gutterBottom>
                  <a href={this.props.consultwebsite}>{this.props.consultwebsite}</a>
                </Typography>
                <br />

                <Typography variant="headline" color="textSecondary" gutterBottom>
                  {this.props.consultDescription}
                  <br />
                  <br />

                </Typography>
                <Typography>
                  {this.props.consultcity}
                </Typography>
                <Typography>
                  {this.props.nation}
                  {' '}

                </Typography>
                <Typography>
                  {this.props.consultemail}
                </Typography>
                <br />

                <div>
                  {' '}
                  {this.props.canEdit}
                </div>
              </CardContent>
              {/* <div>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  className={(classes.expand, {
                    [classes.expandOpen]: this.state.expanded,
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>
Contact Details:
                    {' '}
                  </Typography>
                  <Typography paragraph>
                    {' '}
                    {this.props.hisemail}

                  </Typography>
                  <Typography paragraph>Consultant Description:</Typography>

                  <Typography paragraph>
                    {this.props.consultDescription}
                  </Typography>
                </CardContent>
              </Collapse> */}
              {/* <div>
            {this.Auth.loggedIn() ? (<Button name="consultantId" value={this.props.conID} onClick={this.handleDelete}>DELETE</Button>) : (<div />) }
          </div> */}

            </Card>

          </div>

        </Col>
      </div>
    );
  }
}


export default withStyles(styles)(ConST);
