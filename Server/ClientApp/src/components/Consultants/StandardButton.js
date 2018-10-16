import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Fragment } from 'react';
import { connect } from 'react-redux';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

function StandardButton(props) {
  const { classes } = props;
  return (
    <Fragment>
      <Button variant="contained" component="span" className={classes.button}>Join Consultant Page</Button>
    </Fragment>
  );
}

StandardButton.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => (
  {
    auth: state.authenticated,
  });

const mapDispatchToProps = dispatch => ({});

export default (connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(StandardButton);
