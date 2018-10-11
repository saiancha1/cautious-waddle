import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


const styles = {
    card: {
      maxWidth: 345,      
    },
    media: {
      height: 350,
    },
  };

 const ConST = (props) => {
    const { classes } = props;
    return(
    <div className="col-md-3">
    <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image= {props.consultimage}
      title= {props.lastName}
    />
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {props.firstName} {props.lastName}
      </Typography>
      <Typography component="p" noWrap="true" paragraph="true">
        {props.consultDescription}
      </Typography>
      <Typography component="p" noWrap="true" paragraph="true">
        {props.hisemail}
      </Typography>    
      </CardContent>
  </Card></div>

      );
};

ConST.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ConST);
