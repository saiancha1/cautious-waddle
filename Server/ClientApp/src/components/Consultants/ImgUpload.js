import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    bye: {
      display: 'none',
    },
  });


  const ImgUpload = (props) => {
    const { classes } = props;
      return (
      <div>
        <Input 
        accept="image/*"
        className={classes.bye}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
      </div>
      );
  }
  
  ImgUpload.propTypes = {
    classes: PropTypes.object.isRequired
  };

  export default withStyles(styles)(ImgUpload);
  