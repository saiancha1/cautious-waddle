import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

const ProfileDetails = props => (
  <div>
    <TextField
      id="profile-email"
      label="Email"
      className={styles.textField}
      value={props.profile.email}
      onChange={e => props.handleChange(e, 'email')}
      margin="normal"
      variant="outlined"
    />
    <TextField
      id="profile-firstName"
      label="First Name"
      className={styles.textField}
      value={props.profile.firstName}
      onChange={e => props.handleChange(e, 'firstName')}
      margin="normal"
      variant="outlined"
    />
    <TextField
      id="profile-lastName"
      label="Last Name"
      className={styles.textField}
      value={props.profile.lastName}
      onChange={e => props.handleChange(e, 'lastName')}
      margin="normal"
      variant="outlined"
    />
    <TextField
      id="profile-bio"
      label="Bio"
      className={styles.textField}
    value={props.profile.bio}
      onChange={e => props.handleChange(e, 'bio')}
      margin="normal"
      variant="outlined"
      multiline = "true"
    />
  </div>
);
export default ProfileDetails;
