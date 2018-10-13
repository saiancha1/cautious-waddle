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
            value={props.company.ContactEmail}
            onChange={e => props.handleChange(e, 'ContactEmail')}
            margin="normal"
          />
          <TextField
            id="company-phone"
            label="Phone No."
            className={classes.textField}
            value={props.company.Phone}
            onChange={e => props.handleChange(e, 'Phone')}
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
            value={props.company.Address1}
            onChange={e => props.handleChange(e, 'Address1')}
            margin="normal"
          />
          <TextField
            id="business-add2"
            label="Address Line 2"
            className={classes.textField}
            value={props.company.Address2}
            onChange={e => props.handleChange(e, 'Address2')}
            margin="normal"
          />
          <TextField
            id="business-suburb"
            label="Suburb"
            className={classes.textField}
            value={props.company.Suburb}
            onChange={e => props.handleChange(e, 'Suburb')}
            margin="normal"
          />
          <TextField
            id="business-City"
            label="City"
            className={classes.textField}
            value={props.company.City}
            onChange={e => props.handleChange(e, 'City')}
            margin="normal"
          />
          <TextField
            id="business-PostalCode"
            label="Postal Code"
            className={classes.textField}
            value={props.company.PostalCode}
            onChange={e => props.handleChange(e, 'PostalCode')}
            margin="normal"
          />
          <TextField
            id="business-country"
            label="Country"
            className={classes.textField}
            value={props.company.Country}
            onChange={e => props.handleChange(e, 'Country')}
            margin="normal"
          />
        </div>
        </div>
        </div>
        
  );
};
export default AddCompanyForm2;
