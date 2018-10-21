import React, { Component } from 'react';
import { BrowserRouter as Route, Router, Link } from 'react-router-dom';
import './Work.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import AuthService from './Authentication/AuthService';
import ButtonAppBar from './ButtonAppBar/ButtonAppBar';
import ComplexGrid from './ComplexGrid/ComplexGrid';
import SummerTech from './SummerTech/SummerTech';
import history from './history';


const style = {


  AppBar: {
    marginTop: 10,
    marginBottom: 10,
    colorPrimary: 'white',
  },
  Paper: {
    marginTop: 30,
    marginBottom: 30,
    gutterBottom: true,
  },

};

class Work extends Component {
  Auth = new AuthService();

state = {
  jobs: [],
  selectedJob: null,
  filter: 'All',
  originalJobs: [],
  loginStatus: this.Auth.loggedIn(),
};

async componentWillMount() {
  fetch('api/jobs/getJobs').then(res => res.json())
    .then((json) => {
      this.setState({ jobs: json });
      console.log('Job List');
      console.log(this.state.jobs);
      this.setState({originalJobs: this.state.jobs});
      console.log('Original Job List');
      console.log(this.state.originalJobs);
      this.setState({isLoaded:true});
      console.log(this.state);
    });
}

handleFilterChange = (e) => {
  const val = e.target.value;
  this.setState({ filter: val });
  if (val !== 'All') {
    let newArr = this.state.originalJobs.filter(job => job.workType === e.target.value);
    console.log("Handle Submit function has the following assigned to newArr: ");
    console.log(newArr);
    this.setState({ jobs: newArr });
  } else {
    console.log("Entered else section of handleFilterChange");
    fetch('api/jobs/getJobs').then(res => res.json())
      .then((json) => {
        this.setState({ jobs: json });
        console.log(this.state);
      });
  }
}

 handleClick = (e) => {
   if (this.state.loginStatus == true) {
     history.push('/addconsultant');
   } else {
     this.handleNotLogged();
   }
 }

 handleNotLogged = () => {
  try {
    alert('Please login with your user account to add new job listsings!');
    // window.location.reload();
  } catch (error) {
    alert('There seems to be a problem!');
  }
}


  render() {
    const { classes } = this.props;
    console.log(this.state.jobs);
    return (
      <div className="jobs">
        <Route exact path="/summerTech" component={SummerTech} />
        <div className="jumbotron">
          <div className="container" pull-right>
            <h3 color="white" className="h1">Job listings</h3>
              <p>Looking for your next gig?</p>
                  For summer internships click <Link to="/summertech">here</Link>
          </div>
        </div>
        <Grid container spacing={12}>
          <Grid item sm={3} />
          <Grid item sm={6}>
            <Paper>
              <ButtonAppBar
                style={style.AppBar}
                position="static"
                color="default"
                filter={this.state.filter}
                handleFilterChange={this.handleFilterChange}
                handleClick={this.handleClick}
              >
                <Typography color="inherit" variant="display2" align="center" />
              </ButtonAppBar>
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
                        phone={job.phone}
                      />    
                  </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item sm={3} />
        </Grid>
      </div>
    );
  }
}
export default Work;
