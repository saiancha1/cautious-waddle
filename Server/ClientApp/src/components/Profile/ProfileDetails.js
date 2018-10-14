import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  multitextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    height:"300px",
    width:"300px"
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const ProfileDetails = props => (
  <div className="row">
  <div className="row">
  <div className="col-md-5"/>
  <div className="col-md-4">
    <TextField
      id="profile-email"
      label="Email"
      value={props.profile.email ? props.profile.email : null}
      onChange={e => props.handleChange(e, 'email')}
      margin="normal"
      variant="outlined"
      floatingLabelFixed="true"
      type="text"
    />
    </div>
    </div>
    <div className="row">
  <div className="col-md-5"/>
  <div className="col-md-4">
    <TextField
      id="profile-firstName"
      label="First Name"
      className={styles.textField}
      value={props.profile.firstName}
      onChange={e => props.handleChange(e, 'firstName')}
      margin="normal"
      variant="outlined"
    />
    </div>
    
    </div>
    <div className="row">
    <div className="col-md-5"/>
    <div className="col-md-4">
    <TextField
      id="profile-lastName"
      label="Last Name"
      className={styles.textField}
      value={props.profile.lastName}
      onChange={e => props.handleChange(e, 'lastName')}
      margin="normal"
      variant="outlined"
    />
    </div>
    </div>

    <div className="row">
  <div className="col-md-5"/>
  <div className="col-md-4">
    <TextField
      id="profile-bio"
      label="Bio"
      className={styles.multitextField}
    value={props.profile.bio}
      onChange={e => props.handleChange(e, 'bio')}
      margin="normal"
      variant="outlined"
      multiline = "true"
      
    />
    </div>

    </div>
    <div className="row">
  <div className="col-md-5"/>
  <div className="col-md-4">
  <Button onClick={props.handleProfileSubmit}>Save Profile</Button>
  </div>
  </div>
  </div>
);
export default ProfileDetails;
