import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const GeneralMetrics = props => (
  <div>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={Number(16)}>
          <Grid key="1" item>
            <Card>
              <CardContent>
                <Typography color="textSecondary">
                    Companies
                </Typography>
                <div className="row">
                  <div className="col-md-6">
                          <strong> {props.newCompanies} </strong>
                          <br />
                    New Companies
                        </div>
                  <div className="col-md-6">
                          <strong>{props.totalCompanies}</strong>
                          {' '}
                          <br />
                    Total Companies
                        </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid key="2" item>
            <Card>
              <CardContent>
                <Typography color="textSecondary">
                    Events
                </Typography>
                <div className="row">
                  <div className="col-md-6">
                          <strong>{props.newEvents}</strong>
                          {' '}
                          <br />
                    New Events
                        </div>
                  <div className="col-md-6">
                          <strong>{props.totalEvents}</strong>
                          {' '}
                          <br />
                    Total Events
                        </div>
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
                  <div className="col-md-6">
                          <strong>{props.newJobs}</strong>
                          {' '}
                          <br />
                    New Jobs
                        </div>
                  <div className="col-md-6">
                          <strong>{props.totalJobs}</strong>
                          {' '}
                          <br />
                    Total Jobs
                        </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
          <Grid key="4" item>
            <Card>
              <CardContent>
                <Typography color="textSecondary">
                    Consultants
                </Typography>
                <div className="row">
                  <div className="col-md-6">
                          <strong>{props.newConsultants}</strong>
                          {' '}
                          <br />
                    New Consultants
                        </div>
                  <div className="col-md-6">
                          <strong>{props.totalConsultants}</strong>
                          {' '}
                          <br />
                    Total Consultants
                        </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);
export default GeneralMetrics;
