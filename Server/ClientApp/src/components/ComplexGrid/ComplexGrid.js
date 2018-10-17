import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 600,
    padding: theme.spacing.unit * 2,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

function ComplexGrid(props) {
  const { classes, firstName, secondName, jobTitle , jobId, company, desc, salary, type, email} = props;
  return (
      <Grid container spacing={16}>
        <Grid item>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="display2" color="textPrimary">
                {jobTitle}
              </Typography>
              <Typography gutterBottom variant="display1">
                {company}
              </Typography>
              <Typography variant="headline" >{type}</Typography>
              <Typography variant="headline" color="textSecondary" gutterBottom>{"$"+salary}</Typography>
              <Typography variant="headline" color="textPrimary">{desc}</Typography>
            </Grid>
            <Grid item>
            <Typography variant="headline" color="textSecondary">{"Contact: " +firstName+" "+secondName}</Typography>
            
              <Typography variant="headline" style={{ cursor: 'pointer' }}>
              <a href={"mailto:"+ email}>Apply</a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{"ID:"+jobId }</Typography>
          </Grid>
        </Grid>
      </Grid>
    
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);