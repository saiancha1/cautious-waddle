import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Avatar from '@material-ui/core/Avatar';

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
  const { classes, jobTitle , jobId, company, desc, salary, type, email} = props;
  return (
    <Paper className={classes.root}>
      <Grid container spacing={16}>
        <Grid item>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="title">
                {jobTitle}
              </Typography>
              <Typography gutterBottom variant="subtitle2">
                {company}
              </Typography>
              <Typography gutterBottom>{type}</Typography>
              <Typography color="textSecondary">{"ID:"+jobId }</Typography>
              <Typography color="textSecondary">{desc}</Typography>
            </Grid>
            <Grid item>
              <Typography style={{ cursor: 'pointer' }}>
              <a href={"mailto:"+ email}>Apply</a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{"$"+salary}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);