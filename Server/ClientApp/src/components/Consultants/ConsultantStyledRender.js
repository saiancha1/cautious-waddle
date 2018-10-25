import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import {
  Card, CardBody, CardHeader,
} from 'react-simple-card';
import '../consultants.css';


export default class ConST extends Component {
  render() {
    return (
      <Col md={4} lg={3}>
        <Card className="consult-card-container">
          <CardBody className="consult-card-body">
            <div className="consult-card-img-container">
              <img className="consult-card-img" alt="profile pic" src={this.props.consultimage} />
            </div>
            <h3>
              {this.props.firstName}
              {' '}
              {this.props.lastName}
              {' '}
            </h3>
            <p>
              {this.props.consultDescription}
            </p>
            <ul>
              <li>
                <label>Speciality:</label>
                {this.props.speciality}
              </li>
              <li>
                <label>City:</label>
                {this.props.consultcity}
              </li>
              <li>
                <label>Country:</label>
                {this.props.nation}
              </li>
              <li>
                <label>Website:</label>
                <a href={this.props.consultwebsite}>{this.props.consultwebsite}</a>
              </li>
              <li>
                <label>Email:</label>
                {this.props.consultemail}
              </li>
            </ul>
            <div>
              {this.props.canEdit}
            </div>
          </CardBody>
        </Card>
      </Col>
=======
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
