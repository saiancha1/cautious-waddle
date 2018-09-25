import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      maxWidth: 345,
      marginTop:"30px"
      
    },
    media: {
      height: 140,
    },
  };
 const Company = (props) => {
    const { classes } = props;
    return(
    <div className="col-md-4">
    <Card className={classes.card}>
    <CardMedia
      className={classes.media}
      image={props.companyLogo}
      title={props.companyName}
    />
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {props.companyName}
      </Typography>
      <Typography component="p" noWrap="true" paragraph="true">
        {props.companyDescription}
      </Typography>
    </CardContent>
    <CardActions>
      
      <Button size="small" color="primary">
        More...
      </Button>
    </CardActions>
  </Card>
  </div>    
    );
};

export default withStyles(styles)(Company);
