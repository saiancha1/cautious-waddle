import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
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
import { Row } from 'react-bootstrap';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import history from '../history';
import AuthService from '../Authentication/AuthService';

// This page renders 2 buttons that are placed in the Consultant component. These buttons are edit and delete.
// The Edit button opens up a form with the current information of the posted consultant and allows
// the logged-in user to make a change to their postings.

// These edit and delete buttons only show up to logged in users and only to their OWN postings. This is controlled
// in the complex grid component by the userCanEdit method.

// styling and color variables

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

  },

  buttonz: {
    margin: 5,
  },

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Editz extends React.Component {
  constructor(props) {
    super(props);
  }

  // State here holds the info that is passed on from the consultant component in the < Editz > section
  // they are passed on in the form of props

  state = {
    cID: this.props.conID,
    open: false,
    fname: this.props.firstName,
    lname: this.props.lastName,
    website: this.props.consultwebsite,
    email: this.props.consultemail,
    phone: this.props.phone,
    address1: this.props.addy1,
    address2: this.props.addy2,
    suburb: this.props.sub,
    city: this.props.consultcity,
    country: this.props.nation,
    postalcode: this.props.pCode,
    desc: this.props.consultDescription,
    exp: this.props.speciality,
    imgu: this.props.consultimage,
    selectedFile: null,
  };

  // here we have a constructor for the authentication component

  Auth = new AuthService();

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  // handleChange when the form inputs are being changed by user

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

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
                // console.log(iii);
                this.setState({
                  imgu: iii.imageUrl,
                });
                // console.log(this.state.imgu);
              });
          })

          )

  }

      </div>;
  };

  // This method provides the user with an alret if required fields are missing, doesn't allow submission
  requiredFieldMsg() {
    try {
      alert('Please fill out all required fields');
      // window.location.reload();
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  // Checks required fields are filled in
  requiredFieldCheck = () => {
    if (this.state.email == '' || this.state.exp == '' || this.state.fname == '' || this.state.lname == ''
    || this.state.city == '' || this.state.country == '' || this.state.desc == '') {
      this.requiredFieldMsg();
      return false;
    }
  };


  // This is a method that is a popup message after user submission is successful, also redirects user to
  // consultants page
  handleSubscribe() {
    try {
      alert('Thank you for your Changes. Your posting will appear after approval.');
      history.push('/consultants');
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
    console.log(this.props.conID);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

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
      cID,
    } = this.state;

    if (this.requiredFieldCheck() == false) {
      return false;
    }

    // This is a method that checks for an image being uploaded before submission, if there is no image uploaded
    // or if the user selected an image but did not press SUBMIT IMAGE then the user is prompted to submit
    // the image 1st before submitting the whole form
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

    // This is the edit consultant method as defined as a constant before being invoked at res()
    // here the method first invokes the check for image method, if there is an image that has been
    // successfully uploaded including the image added when the user initially created the consultant
    // then the method foes on to submit a POST request using fetch to the endpoint URL in the API
    // the body of the POST request must be
    // formatted to match the format of the backend system and then submitted
    const res = () => {
      if (this.checkforImage() == false) {
        return false;
      } else {
        fetch('api/Consultants/editConsultant', {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            // Authorization : 'Token' +' '+ localStorage.getItem('id_token'),
            Authorization: `Bearer ${this.Auth.getToken()}`,
          },
          body: JSON.stringify({
            consultantId: cID,
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
      }
    };

    const PostingConsultantInfo = () => res.json();
    res();
    this.handleClose();
    window.location.reload();
  }

  // If a consultant can't be deleted they get an error message
   handleNoDelError = () => {
     try {
       alert('Cannot Delete right now. Try Again Later, or Contact Support. Thank you.');
     } catch (e) {
       alert('There seems to be a problem!');
     }
   };

   // If a consultant is deleted they get a confirmation message

   handleDelMsg = () => {
     alert('The selected Consultant has been Deleted.');
   };

   // when delete is pressed the dres() method is defined then invoked.
   // the dres() method sends a POST request to the backdoor URL endpoint with the consultant ID in the body
   // the request then deletes it from the backdoor and the page is re-rendered with the updated consultant
   // listings
   handleDelete = (e) => {
     const dres = () => {
       try {
         fetch('api/Consultants/removeConsultant', {
           method: 'POST',
           headers: {
             Accept: 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
             Authorization: `Bearer ${this.Auth.getToken()}`,
           },
           body: this.state.cID,
         });
         this.handleDelMsg();
         window.location.reload();


         // console.log('Delete Successful');
       } catch (error) {
         this.handleNoDelError(error);
         return null;
       }
     };

     dres(e);
   };

   render() {
     const { classes } = this.props;
     return (
       <div>
         <Button className={classes.buttonz} size="small" variant="outlined" onClick={this.handleClickOpen} value={this.props.conID}>Edit</Button>
         <Button size="small" variant="outlined" onClick={this.handleDelete} value={this.props.conID}>Delete</Button>
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
                Edit Consultant
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
                     placeholder={this.props.firstName}
                     value={this.state.fname}
                     onChange={this.handleChange}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     name="lname"
                     label="Last Name"
                     className={classes.textField}
                     placeholder={this.props.lastName}
                     value={this.state.lname}
                     onChange={this.handleChange}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Specialist Area"
                     name="exp"
                     placeholder={this.props.speciality}
                     className={classes.textField}
                     value={this.state.exp}
                     onChange={this.handleChange}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Website"
                     name="website"
                     value={this.state.website}
                     onChange={this.handleChange}
                     placeholder={this.props.website}
                     className={classes.textField}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Phone"
                     name="phone"
                     value={this.state.phone}
                     onChange={this.handleChange}
                     placeholder={this.props.phone}
                     className={classes.textField}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Email"
                     name="email"
                     value={this.state.email}
                     onChange={this.handleChange}
                     placeholder={this.props.consultemail}
                     className={classes.textField}
                     margin="large"
                   />
                 </FormGroup>
                 <FormGroup>
                   <TextField
                     id="standard-name"
                     label="Address Line 1"
                     name="address1"
                     value={this.state.address1}
                     onChange={this.handleChange}
                     placeholder={this.props.addy1}
                     className={classes.textField}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Address Line 2"
                     name="address2"
                     value={this.state.address2}
                     onChange={this.handleChange}
                     placeholder={this.props.addy2}
                     className={classes.textField}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Suburb"
                     name="suburb"
                     value={this.state.suburb}
                     onChange={this.handleChange}
                     placeholder={this.props.sub}
                     className={classes.textField}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="City"
                     name="city"
                     value={this.state.city}
                     onChange={this.handleChange}
                     placeholder={this.props.city}
                     className={classes.textField}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Country"
                     name="country"
                     value={this.state.country}
                     onChange={this.handleChange}
                     placeholder={this.props.nation}
                     className={classes.textField}
                     margin="large"
                   />
                   <TextField
                     id="standard-name"
                     label="Postal Code"
                     name="postalcode"
                     value={this.state.postalcode}
                     onChange={this.handleChange}
                     placeholder={this.props.pCode}
                     className={classes.textField}
                     margin="large"
                   />
                 </FormGroup>
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
                 />
                 <ListItem>
                   <FormGroup>
                     <CardMedia
                       className={classes.media}
                       image={this.props.consultimage}
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

Editz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Editz);
