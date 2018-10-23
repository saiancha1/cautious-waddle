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
      marginTop:"30px", 
    },
    media: {
      height: 140,
    },
  };
 const Company = (props) => {
    const { classes } = props;
    let modal;
    let companyEdit;
    const edit = (props.canEdit) ? <Button onClick={this.companyEdit = props.editCompany}>Edit</Button> : null;
    return(
    <div className="col-md-4 company-card-container">
    <Card className="company-card">
    <CardMedia
      className={classes.media}
      image={props.companyLogo}
      title={props.companyName}
      height="140"
    />
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {props.companyName}
      </Typography>
      <Typography component="p" noWrap="true" paragraph="true" dangerouslySetInnerHTML={props.generateDesc}>
        
      </Typography>
    </CardContent>
    <CardActions>
      <button className="show-company" onClick={this.modal = props.handleModalOpen}>
        Show Details
      </button>
      {edit}
    </CardActions>
  </Card>
  {this.modal}
  {this.companyEdit}
  </div>    
    );
};

export default withStyles(styles)(Company);
