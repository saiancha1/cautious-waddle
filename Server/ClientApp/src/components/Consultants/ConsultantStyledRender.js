import React, { Component } from 'react';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Row, Col } from 'react-bootstrap';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import AuthService from '../Authentication/AuthService';


const styles = {

  card: {
    maxWidth: 345,
    margin: 10,
    padding: 10,

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
              <Typography gutterBottom variant="h5" component="h3">
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

                <Typography gutterBottom variant="Display1" component="h4">
                  {this.props.consultwebsite}
                </Typography>
                <Typography>
                  {this.props.hisemail}
                </Typography>
                <Typography variant="subtitle1" noWrap="true" paragraph="true">
                  {this.props.consultDescription}
                </Typography>
                <Typography>
                  {this.props.nation}
                  {' '}

                </Typography>
                <Typography component="p" noWrap="true" paragraph="true">
                  {this.props.hisemail}
                </Typography>
                <div>
                  {' '}
                  {this.props.canEdit}
                </div>
              </CardContent>
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
