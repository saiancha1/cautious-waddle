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

  state = {
    cID: this.props.conID,
    open: false,
    fname: this.props.firstName,
    lname: this.props.lastName,
    website: this.props.website,
    email: this.props.hisemail,
    phone: this.props.phone,
    address1: this.props.addy1,
    address2: this.props.addy2,
    suburb: this.props.sub,
    city: this.props.city,
    country: this.props.nation,
    postalcode: this.props.pCode,
    desc: this.props.consultDescription,
    exp: this.props.speciality,
    imgu: this.props.consultimage,
    selectedFile: null,
  };

  Auth = new AuthService();

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

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

    // history.push('/consultants');

    // console.log(PostingConsultantInfo);
    // console.log(res);
    // console.log(`Bearer ${this.Auth.getToken()}`);
  }

   handleNoDelError = (e) => {
     try {
       alert('Cannot Delete right now. Try Again Later, or Contact Support. Thank you.');
     } catch (e) {
       alert('There seems to be a problem!');
     }
   };

   handleDelMsg = (e) => {
     alert('The selected Consultant has been Deleted.');
   };

   handleDelete = (e) => {
     const connerId = e.target.value;
     console.log(connerId);

     const dres = () => {
       try {
         fetch('api/Consultants/removeConsultant', {
           method: 'POST',
           headers: {
             Accept: 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
             Authorization: `Bearer ${this.Auth.getToken()}`,
           },
           body: connerId,
         });
         this.handleDelMsg(e);
         window.location.reload();


         // console.log('Delete Successful');
       } catch (error) {
         this.handleNoDelError(error);
         return null;
       }
     };
     // .then(res.json());
     if (connerId == undefined) {
       this.handleNoDelError();
     } else {
       dres();
     }
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
                     placeholder={this.props.hisemail}
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
