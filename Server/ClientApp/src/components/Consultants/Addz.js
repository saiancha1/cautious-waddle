import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { FormGroup } from 'react-bootstrap';
import grey from '@material-ui/core/colors/grey';
import { Row, Col } from 'react-bootstrap';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import history from '../history';
import AuthService from '../Authentication/AuthService';


// This FORM is to ADD a consultant. This is a popup form that only appears if a user is logged in.

// here we are defining some constant colors and styles
const mygrey = grey[700];

const styles = theme => ({
  appBar: {
    position: 'relative',
    background: mygrey,
  },
  flex: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  media: {
    height: 350,
    width: 345,
    marginLeft: 170,

  },

  spacedout: {
    marginLeft: 350,
    marginTop: -60,
  },
  buttonspaced: {
    marginLeft: 270,
  },

  buttonspacedtwo: {
    marginLeft: 320,
    marginTop: 0,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

// the Addz class which adds a new consultant (after being approved by the admin of course)

// The state for all the fields is initially set as empty
class Addz extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fname: '',
    lname: '',
    website: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    suburb: '',
    city: '',
    country: '',
    postalcode: '',
    desc: '',
    exp: '',
    selectedFile: null,
    imgu: null,
  };

  // here we have a constructor for the authentication component
  Auth = new AuthService();


  // this method sets the state for a container that holds the image file the user selects when clicking
  // on the add image button
  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  // error message method when user presses button for join consultants.
  handleNotLogged() {
    try {
      alert('Please Login to Add Consultant');
      // window.location.reload();
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  // method that alerts user if there are missing required input fields that are empty
  requiredFieldMsg() {
    try {
      alert('Please fill out all required fields');
      // window.location.reload();
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  // this method sets the target to the value - here the input field defines both and this is a generic
  // method that works for all the input fields depending on their name and value fields. We match the names to the
  // names in state, and the value to the value of those states.
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // method that does the check for missing/empty input fields that are required
  requiredFieldCheck = () => {
    if (this.state.email == '' || this.state.exp == '' || this.state.fname == '' || this.state.lname == ''
    || this.state.city == '' || this.state.country == '' || this.state.desc == '') {
      this.requiredFieldMsg();
      return false;
    }
  };

  // This method handles when a user uploads an image. The selected file container is holding the actual file
  // before it is uploaded, the method takes this file and posts it to the URL endpoint, which in turn returns
  // a resulting URL. This method takes the returned result from the backend and uses that data to display an
  // image that is stored

  // the part where this method is receiving the data from the database starts with .then((res)) and onwards.

  handleImageUpload = (e) => {
    e.preventDefault();
    console.log(this.state.selectedFile);
    const mydata = new FormData();
    const file = this.state.selectedFile;

    mydata.append('file', file);
    console.log(this.state.selectedFile);

      <div>
        {file == null ? (console.log('do nothing'))
          : (fetch('api/Consultants/addConsultantImage', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('id_token')}`,
            },
            body: mydata,
          }).then((res) => {
            res.json()
              .then((retrieveddata) => {
                const iii = retrieveddata;
                console.log(iii);
                this.setState({
                  imgu: iii.imageUrl,
                });
                console.log(this.state.imgu);
              });
          })

          )

  }

      </div>;
  };

  // This is a method that is a popup message after user submission is successful, also redirects user to
  // consultants page
  handleSubscribe() {
    try {
      alert('Thank you. Your posting will appear after approval.');
      history.push('/consultants');
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  // method that is invoked when user clicks on joing consultants page button. First it checks if user is
  // logged in by using the loggedin() method from the Authentication component, if so it sets state
  // to open and the form pops up
  handleClickOpen = () => {
    if (this.Auth.loggedIn() == false) {
      this.handleNotLogged();
    } else {
      this.setState({ open: true });
    }
    // console.log(this.props.conID);
  };

  // method that closes form when close button pressed
  handleClose = () => {
    this.setState({ open: false });
  };

  // method that processes submission once submit button is pressed in the add consultant form
  // first the method sets the state constants, then it transfers the current state held to a format that
  // is accepted by the backend system, and transfers that to the body of the POST request in the res() method
  // before posting however, this method also invokes the checkimage method which ensures that the form user
  // has both selected and submitted an image, and it also invokes the required fields method which ensures
  // that all requried fields are filled out

  // after all this the res method is defined, and then called followed by methods for checking errors, and
  // methods that provide messages to the users confirming that the submission was successful.
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const {
      fname,
      lname,
      website,
      email,
      phone,
      address1,
      address2,
      suburb,
      city,
      country,
      postalcode,
      desc,
      exp,
      imgu,
    } = this.state;

    if (this.requiredFieldCheck() == false) {
      return false;
    }
    // checks that an image has bbeen submited by checking whether imgu state is filled
    this.checkforImage = () => {
      if (imgu == null) {
        try {
          alert('Please Submit selected Image Before Submitting Consultant');
          return false;
        } catch (error) {
          alert('There seems to be a problem!');
          return false;
        }
      }
    };

    // this is the post method being defined for add consultant call
    const res = () => {
      if (this.checkforImage() == false) {
        return false;
      } else {
        fetch('api/Consultants/addConsultant', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.Auth.getToken()}`,
          },
          body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            imageURL: imgu,
            specialistArea: exp,
            consultantDesc: desc,
            phone,
            email,
            website,
            address1,
            address2,
            suburb,
            postalCode: postalcode,
            city,
            country,
          }),
        });
        this.handleSubscribe();
        this.handleClose();
        window.location.reload();
      }
    };

    const PostingConsultantInfo = () => res.json();
    res();
  }

  // This part essentially renders the form which takes in all the inputs from the user.
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" size="medium" color={mygrey} onClick={this.handleClickOpen} value={this.props.conID}>Join Consultant Page</Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="black" className={classes.flex}>
                Add Consultant
              </Typography>
              <Button color="inherit" onClick={this.handleSubmit}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <form className={classes.container} noValidate autoComplete="off">
                <FormGroup>
                  <TextField
                    id="standard-name"
                    name="fname"
                    label="First Name"
                    className={classes.textField}
                    // placeholder={this.props.firstName}
                    value={this.state.fname}
                    onChange={this.handleChange}
                    margin="large"
                    required
                  />
                  <TextField
                    id="standard-name"
                    name="lname"
                    label="Last Name"
                    className={classes.textField}
                    // placeholder={this.props.lastName}
                    value={this.state.lname}
                    onChange={this.handleChange}
                    margin="large"
                    required
                  />
                  <TextField
                    id="standard-name"
                    label="Specialist Area"
                    name="exp"
                    // placeholder={this.props.speciality}
                    className={classes.textField}
                    value={this.state.exp}
                    onChange={this.handleChange}
                    margin="large"
                    required
                  />
                  <TextField
                    id="standard-name"
                    label="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.handleChange}
                    placeholder="http://www.MyWebsite.com"
                    className={classes.textField}
                    margin="large"
                  />
                  <TextField
                    id="standard-name"
                    label="Phone"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.handleChange}
                    // placeholder={this.props.phone}
                    className={classes.textField}
                    margin="large"
                  />
                  <TextField
                    id="standard-name"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    className={classes.textField}
                    onChange={this.handleChange}
                    margin="large"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    id="standard-name"
                    label="Address Line 1"
                    name="address1"
                    value={this.state.address1}
                    onChange={this.handleChange}
                    // placeholder={this.props.addy1}
                    className={classes.textField}
                    margin="large"
                  />
                  <TextField
                    id="standard-name"
                    label="Address Line 2"
                    name="address2"
                    value={this.state.address2}
                    onChange={this.handleChange}
                    // placeholder={this.props.addy2}
                    className={classes.textField}
                    margin="large"
                  />
                  <TextField
                    id="standard-name"
                    label="Suburb"
                    name="suburb"
                    value={this.state.suburb}
                    onChange={this.handleChange}
                    // placeholder={this.props.sub}
                    className={classes.textField}
                    margin="large"
                  />
                  <TextField
                    id="standard-name"
                    label="City"
                    name="city"
                    value={this.state.city}
                    onChange={this.handleChange}
                    // placeholder={this.props.city}
                    className={classes.textField}
                    margin="large"
                    required
                  />
                  <TextField
                    id="standard-name"
                    label="Country"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleChange}
                    // placeholder={this.props.nation}
                    className={classes.textField}
                    margin="large"
                    required
                  />
                  <TextField
                    id="standard-name"
                    label="Postal Code"
                    name="postalcode"
                    value={this.state.postalcode}
                    onChange={this.handleChange}
                    // placeholder={this.props.pCode}
                    className={classes.textField}
                    margin="large"
                  />
                  <Col>
                    <TextField
                      id="standard-multiline-static"
                      label="Consultant Description"
                      name="desc"
                      value={this.state.desc}
                      onChange={this.handleChange}
                      multiline
                      rows="4"
                  // defaultValue="Default Value"
                      className={classes.textField}
                      margin="large"
                      required
                    />

                  </Col>
                </FormGroup>
                <ListItem>
                  <FormGroup>
                    <CardMedia
                      className={classes.media}
                      image={this.state.imgu}
                      title={this.props.lastName}
                    />
                    <Typography variant="caption">

                  Current Image
                    </Typography>
                    <Row>
                      <Input type="file" onChange={this.fileSelectedHandler}>Upload New Image</Input>
                    </Row>
                    <Row>
                      <Button onClick={this.handleImageUpload}>Submit New Image</Button>
                    </Row>
                  </FormGroup>
                </ListItem>

              </form>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

Addz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Addz);
