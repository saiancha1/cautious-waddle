import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import AuthService from '../Authentication/AuthService';

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

const authService = new AuthService();

function ComplexGrid(props) {
  const {
    classes, firstName, secondName, jobTitle, jobId, company, desc, salary, type, phone, email, userId,
  } = props;

  const handleDelMsg = (e) => {
    alert('The selected Job has been Deleted.');
  };

  const handleNoDelMsg = (e) => {
    alert('Cannot Delete Right Now, Please Try Again.');
  };

  const dres = () => {
    try {
      fetch('api/Jobs/removeJob', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authService.getToken()}`,
        },
        body: props.jobId,
      });
      handleDelMsg();
      window.location.reload();

      console.log('Delete Successful');
    } catch (error) {
      console.log(error);
      handleNoDelMsg(error);
      return null;
    }
  };

  const handleDelete = (e) => {
    const jobId = props.jobId;
    console.log(jobId);
    dres();
  };

  const userCanEdit = (props) => {
    if (authService.loggedIn()) {
      const token = authService.getProfile();
      const usertoken = token.id;
      // const conID = con.consultantId;
      if (props.userId == usertoken) {
        // console.log(con.userId);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <Grid container spacing={16}>
      <Grid item />
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={16}>
          <Grid item xs>
            <Typography gutterBottom variant="display2" color="textPrimary">
              {jobTitle}
            </Typography>
            <Typography>
              <div>
                { userCanEdit(props) ? (
                  <div>
                    <Button>Edit Job</Button>
                    <Button onClick={handleDelete} value={jobId}>Delete</Button>
                  </div>
                ) : null }
                {' '}

              </div>
            </Typography>
            <Typography gutterBottom variant="display1">
              {company}
            </Typography>
            <Typography variant="headline">{type}</Typography>
            <Typography variant="headline" color="textSecondary" gutterBottom>{`$${salary}`}</Typography>
            <Typography variant="headline" color="textPrimary">{desc}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="headline" color="textSecondary">{`Contact: ${firstName} ${secondName}`}</Typography>
            <Grid container direction="row" xs={12}>
              <Grid item xs={4}>
                <Typography variant="headline">{`Tel: ${phone}`}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="headline">{`Email: ${email}`}</Typography>
              </Grid>
            </Grid>
            <Typography variant="headline" style={{ cursor: 'pointer' }}>
              <a href={`mailto:${email}`}>Apply</a>
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{`ID:${jobId}` }</Typography>
        </Grid>
      </Grid>
    </Grid>

  );
}

ComplexGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComplexGrid);
