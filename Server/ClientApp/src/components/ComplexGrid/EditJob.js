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
import MenuItem from '@material-ui/core/MenuItem';
import history from '../history';
import AuthService from '../Authentication/AuthService';

// This page renders 2 buttons that are placed in the complex grid component. These bbuttons are edit and delete.
// The Edit button opens up a form with the current information of the posted job and allows
// the logged in user to make a change to their posting.

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


// the EditJob Class
class EditJob extends React.Component {
  constructor(props) {
    super(props);
  }


  // State here holds the info that is passed on from the ComplexGrid component in the < EditJob > section
  // they are passed on in the form of props

  state = {
    open: false,

    jID: this.props.jobId,
    fname: this.props.fname,
    lname: this.props.lname,
    website: null,
    email: this.props.email,
    phone: this.props.phone,
    desc: this.props.description,
    title: this.props.title,
    company: this.props.company,
    salary: this.props.salary,
    jobbtype: this.props.type,
    expiry: this.props.expiry,

  };

  // here we have a constructor for the authentication component
  Auth = new AuthService();

  // handleChange when the form inputs are being changed by user
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

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
    if (this.state.email == '' || this.state.title == '' || this.state.fname == '' || this.state.lname == ''
    || this.state.company == '' || this.state.salary == '' || this.state.desc == '' || this.state.jobbtype == '') {
      this.requiredFieldMsg();
      return false;
    }
  };

  // This is a method that is a popup message after user submission is successful, also redirects user to
  // work page and reloads the page
  handleSubscribe() {
    try {
      alert('Thank you for your Changes. Your posting will appear after approval.');
      this.handleClose();
      window.location.reload();
    } catch (error) {
      alert('There seems to be a problem!');
    }
  }

  // when edit bubtton is clicked state of drawer is true and it pops up
  handleClickOpen = () => {
    this.setState({ open: true });
    // console.log(this.props.jobId);
  };

  // closes drawer
  handleClose = () => {
    this.setState({ open: false });
  };


  // submits filled out form
  // this method takes the most recent state of defined state containers and transfers them to the body of
  // the defined POST request method res()
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    const {
      jID,
      fname,
      lname,
      website,
      email,
      phone,
      desc,
      title,
      company,
      salary,
      jobbtype,
      expiry,
    } = this.state;

    // checking that required fields are filled - invoking method
    if (this.requiredFieldCheck() == false) {
      return false;
    }

    // defining the method for the POST request for edit using the edit JOB url endpoint, the body section
    // takes in the latest defined states and changes them to the form that the url endpoint (backend) accepts
    // even a small mismatch in this format will cause a 400 bad request
    const res = () => {
      fetch('/api/jobs/editJob', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          // Authorization : 'Token' +' '+ localStorage.getItem('id_token'),
          Authorization: `Bearer ${this.Auth.getToken()}`,
        },
        body: JSON.stringify({
          jobId: jID,
          contactFirstName: fname,
          contactLastName: lname,
          jobDescription: desc,
          contactPhone: phone,
          contactEmail: email,
          website,
          companyName: company,
          companyId: null,
          jobTitle: title,
          salary,
          workType: jobbtype,
          expiry,
        }),
      });
      this.handleSubscribe();
    };
    // invoking the method to post
    res();
  };

  // this is a handle deletemessage
   handleDelMsg = () => {
     alert('The selected Job has been Deleted.');
   };

   // if there is an error with delete this error pops up
   handleNoDelMsg = () => {
     alert('Cannot Delete Right Now, Please Try Again.');
   };

   // defining the method for deleting a job using delete job endpoint
   dres = () => {
     try {
       fetch('api/Jobs/removeJob', {
         method: 'POST',
         headers: {
           Accept: 'application/json, text/plain, */*',
           'Content-Type': 'application/json',
           Authorization: `Bearer ${this.Auth.getToken()}`,
         },
         body: this.state.jID,
       });

       this.handleDelMsg();
       window.location.reload();

       //    console.log('Delete Successful');
     } catch (error) {
       console.log(error);
       this.handleNoDelMsg(error);
       return null;
     }
   };

   // when delete button is clicked the delete method is invoked dres()
 handleDelete = () => {
   //    const jobId = jobId;
   //    console.log(jobId);
   this.dres();
 };

 render() {
   const { classes } = this.props;
   return (
     <div>
       <Button className={classes.buttonz} size="small" variant="outlined" onClick={this.handleClickOpen} value={this.props.conID}>Edit</Button>
       <Button size="small" variant="outlined" onClick={this.handleDelete}>Delete</Button>
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
                Edit Job
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
                   label="Contact Person First Name"
                   className={classes.textField}
                   placeholder={this.props.fname}
                   value={this.state.fname}
                   onChange={this.handleChange}
                   margin="large"
                 />
                 <TextField
                   id="standard-name"
                   name="lname"
                   label="Contact Person Last Name"
                   className={classes.textField}
                   placeholder={this.props.lname}
                   value={this.state.lname}
                   onChange={this.handleChange}
                   margin="large"
                 />
                 <TextField
                   id="standard-name"
                   label="Company Name"
                   name="company"
                   placeholder={this.props.company}
                   className={classes.textField}
                   value={this.state.exp}
                   onChange={this.handleChange}
                   margin="large"
                 />
                 <TextField
                   id="type-select"
                   select
                   label="Job Type"
                   name="jobbtype"
                   placeholder={this.props.type}
                   value={this.state.jobbtype}
                   onChange={this.handleChange}
                   helperText="Please select the type of employment"
                   margin="normal"
                 >
                   <MenuItem key="Full Time" value="Full Time">
                            Full Time
                   </MenuItem>
                   <MenuItem key="Part Time" value="Part Time">
                            Part Time
                   </MenuItem>
                   <MenuItem key="Contract" value="Contract">
                            Contract
                   </MenuItem>
                 </TextField>
                 <TextField
                   id="standard-name"
                   label="Contact Phone"
                   name="phone"
                   value={this.state.phone}
                   onChange={this.handleChange}
                   placeholder={this.props.phone}
                   className={classes.textField}
                   margin="large"
                 />
                 <TextField
                   id="standard-name"
                   label="Contact Email"
                   name="email"
                   value={this.state.email}
                   onChange={this.handleChange}
                   placeholder={this.props.email}
                   className={classes.textField}
                   margin="large"
                 />
               </FormGroup>
               <FormGroup>
                 <TextField
                   id="standard-name"
                   label="Salary"
                   name="salary"
                   value={this.state.salary}
                   onChange={this.handleChange}
                   placeholder={this.props.salary}
                   className={classes.textField}
                   margin="large"
                 />
                 <TextField
                   id="standard-name"
                   label="Job Title"
                   name="title"
                   value={this.state.title}
                   onChange={this.handleChange}
                   placeholder={this.props.title}
                   className={classes.textField}
                   margin="large"
                 />
                 <TextField
                   id="date"
                   label="Expiry Date"
                   type="date"
                   name="expiry"
                   defaultValue={this.props.expiry}
                //    placeholder={this.props.expiry}
                   value={this.state.expiry}
                   margin="normal"
                   onChange={this.handleChange}
                   InputLabelProps={{
                     shrink: true,
                   }}
                 />
               </FormGroup>
               <TextField
                 id="standard-multiline-static"
                 label="Job Description"
                 name="desc"
                 value={this.state.desc}
                 onChange={this.handleChange}
                 placeholder={this.props.description}
                 multiline
                 rows="4"
                  // defaultValue="Default Value"
                 className={classes.textField}
                 margin="large"
               />
             </form>
           </ListItem>
         </List>
       </Dialog>
     </div>
   );
 }
}

EditJob.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditJob);
