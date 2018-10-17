import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './Work.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ButtonAppBar from './AppBar/ButtonAppBar';
import ComplexGrid from './ComplexGrid/ComplexGrid';


const style = {

  AppBar: {
    marginTop: 10,
    marginBottom: 10,
    colorPrimary: 'white',
  },
  
  Paper: {
    marginTop: 30,
    marginBottom: 30,
    gutterBottom: true
  },
};

class Work extends Component {
state = {
  jobs: [],
};



async componentWillMount() {
  fetch('api/jobs/getJobs').then(res => res.json())
    .then((json) => {
      this.setState({ jobs: json });
    });
}


render() {
  const { classes } = this.props;
  console.log(this.state.jobs);
  return (
    <div className="jobs" >
          <ButtonAppBar >
            <h2>Job Listings</h2>
            </ButtonAppBar>

      <Grid container spacing={12}>
      <Grid item sm={3}>
          </Grid>
        <Grid item sm={6}>
        <Paper>
        <AppBar  style={style.AppBar} position="static" color="default">
        <Typography color="inherit" variant="display2" align="center">
          Latest Jobs
        </Typography>
            </AppBar>
        <List className="listing" >
          {this.state.jobs.map(job => (
            <div>
              <ListItem>
                <ComplexGrid
                  jobTitle={job.jobTitle} 
                  jobId={job.jobId} 
                  firstName={job.contactFirstName} 
                  secondName={job.contactLastName} 
                  company={job.companyName} 
                  desc={job.jobDescription} 
                  salary={job.salary} 
                  type={job.workType} 
                  email={job.contactEmail}
                />           
              </ListItem>
            <Divider />
            </div>
          ))}
          </List>
          </Paper>
          </Grid>
          <Grid item sm={3}>
          </Grid>
          </Grid> 
    </div>
  );
}
}
export default Work;
