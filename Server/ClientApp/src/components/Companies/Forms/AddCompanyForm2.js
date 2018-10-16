import React from 'react';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
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
});
const AddCompanyForm2 = (props) => {
  const classes = styles;
  return (
    <div className="row">
    <div className="row">
        <div className="col-md-5"/>
        <div className="col-md-4">
          <TextField
            id="company-email"
            label="Email"
            className={classes.textField}
            value={props.company.contactEmail}
            onChange={e => props.handleChange(e, 'contactEmail')}
            margin="normal"
          />
          <TextField
            id="company-phone"
            label="Phone No."
            className={classes.textField}
            value={props.company.phone}
            onChange={e => props.handleChange(e, 'phone')}
            margin="normal"
          />
        </div>
        </div>

        <div className="row">
        <div className="col-md-5"/>
        <div className="col-md-4">
          <TextField
            id="business-add1"
            label="Address Line 1"
            className={classes.textField}
            value={props.company.address1}
            onChange={e => props.handleChange(e, 'address1')}
            margin="normal"
          />
          <TextField
            id="business-add2"
            label="Address Line 2"
            className={classes.textField}
            value={props.company.address2}
            onChange={e => props.handleChange(e, 'address2')}
            margin="normal"
          />
          <TextField
            id="business-suburb"
            label="Suburb"
            className={classes.textField}
            value={props.company.suburb}
            onChange={e => props.handleChange(e, 'suburb')}
            margin="normal"
          />
          <TextField
            id="business-City"
            label="City"
            className={classes.textField}
            value={props.company.city}
            onChange={e => props.handleChange(e, 'city')}
            margin="normal"
          />
          <TextField
            id="business-PostalCode"
            label="Postal Code"
            className={classes.textField}
            value={props.company.postalCode}
            onChange={e => props.handleChange(e, 'postalCode')}
            margin="normal"
          />
          <TextField
            id="business-country"
            label="Country"
            className={classes.textField}
            value={props.company.country}
            onChange={e => props.handleChange(e, 'country')}
            margin="normal"
          />
        </div>
        </div>
        </div>
        
  );
};
export default AddCompanyForm2;
