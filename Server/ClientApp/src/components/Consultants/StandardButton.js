import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Fragment } from "react";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
});

function StandardButton(props) {
  const { classes } = props;
  return (
    <Fragment>
        <Button variant="contained" component="span" className={classes.button}>
          Add Consultant
        </Button>
    </Fragment>
  );
}

StandardButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StandardButton);
