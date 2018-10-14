import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const ExpiringSoon = props => (
  <div>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={Number(16)}>
          <Grid key="2" item>
            <Card>
              <CardContent>
                <Typography color="textSecondary">
                    Events
                </Typography>
                <div className="row">
                 There are
                  {' '}
                  <strong>{props.expiringEvents}</strong>
                  {' '}
events expiring soon.
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid key="3" item>
            <Card>
              <CardContent>
                <Typography color="textSecondary">
                    Jobs
                </Typography>
                <div className="row">
                 There are
                  {' '}
                  <strong>{props.expiringJobs}</strong>
                  {' '}
Jobs expiring soon.
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);
export default ExpiringSoon;
