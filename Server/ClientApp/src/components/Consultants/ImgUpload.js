import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    bye: {
      display:'none',
    },
  });

  // const byebyeStyle = {
  //     display: 'none',
  // };

  const ImgUpload = (props) => {
    const { classes } = props;
      return (
      <div>
        <input 
        className={classes.bye}
        accept="image/*"
        id="contained-button-file"
        multipletype="file"
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className={classes.button}>
          Upload
        </Button>
      </label>
      </div>
      );
  }
  
  export default withStyles(styles)(ImgUpload);
  