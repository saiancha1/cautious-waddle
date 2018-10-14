import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Analytics from './Analytics';
import GeneralMetrics from './GeneralMetrics';
import ExpiringSoon from './ExpiringSoon';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class MainDashboard extends React.Component {
    state = {
      value: 0,
      companies: [],
      events: [],
      jobs: [],
      consultants: [],
      newCompanies: null,
    };


    componentDidMount() {
      fetch('api/companies/adminGetCompanies', {
        headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      }).then(res => res.json())
        .then((json) => {
          this.setState({ companies: json });
        })
        .catch(() => { this.setState({ isAdmin: false }); });

      fetch('api/events/adminGetEvents', {
        headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      }).then(res => res.json())
        .then((json) => {
          this.setState({ events: json });
        })
        .catch(() => { this.setState({ isAdmin: false }); });

      fetch('api/Consultants/adminGetConsultants', {
        headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      }).then(res => res.json())
        .then((json) => {
          this.setState({ consultants: json });
        })
        .catch(() => { this.setState({ isAdmin: false }); });

      fetch('api/jobs/adminGetJobs', {
        headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
      }).then(res => res.json())
        .then((json) => {
          this.setState({ jobs: json });
        })
        .catch(() => { this.setState({ isAdmin: false }); });
    }

     styles = theme => ({
       root: {
         flexGrow: 1,
         backgroundColor: theme.palette.background.paper,
       },
     });

     handleChange = (e, value) => {
       e.preventDefault();
       this.setState({ value });
     }

     getNewCompanies = () => {
       const date = new Date();
       date.setDate(date.getDate() - 7);
       const newCompanies = this.state.companies.filter((company) => {
         const currDate = new Date(company.creationDate);
         return currDate > date;
       });
       return newCompanies.length;
     }

     getTotalCompanies = () => this.state.companies.length

     getNewJobs = () => {
       const date = new Date();
       date.setDate(date.getDate() - 7);
       const newJobs = this.state.jobs.filter((job) => {
         const currDate = new Date(job.creationDate);
         return currDate > date;
       });
       return newJobs.length;
     }

     getTotalJobs = () => this.state.jobs.length

     getNewConsultants = () => {
       const date = new Date();
       date.setDate(date.getDate() - 7);
       const newConsultants = this.state.consultants.filter((consultant) => {
         const currDate = new Date(consultant.creationDate);
         return currDate > date;
       });
       return newConsultants.length;
     }

     getNewEvents = () => {
       const date = new Date();
       date.setDate(date.getDate() - 7);
       const newEvents = this.state.events.filter((event) => {
         const currDate = new Date(event.creationDate);
         return currDate > date;
       });
       return newEvents.length;
     }

     getTotalEvents = () => this.state.events.length;


     getTotalConsultants = () => this.state.consultants.length;

     getExpiringEvents = () => {
       const date = new Date();
       date.setDate(date.getDate() + 7);
       const newEvents = this.state.events.filter((event) => {
         const currDate = new Date(event.creationDate);
         currDate.setDate(currDate.getDate() + event.duration);
         return currDate < date;
       });
       return newEvents.length;
     }

     getExpiringJobs = () => {
       const date = new Date();
       date.setDate(date.getDate() + 7);
       const newJobs = this.state.events.filter((job) => {
         const currDate = new Date(job.expiry);
         return currDate < date;
       });
       return newJobs.length;
     }

     render() {
       const classes = this.styles;
       const { value } = this.state;
       const newCompanies = this.getNewCompanies();
       const totalCompanies = this.getTotalCompanies();
       const totalJobs = this.getTotalJobs();
       const newJobs = this.getNewJobs();
       const newConsultants = this.getNewConsultants();
       const totalConsultants = this.getTotalConsultants();
       const newEvents = this.getNewEvents();
       const totalEvents = this.getTotalEvents();
       const expiringEvents = this.getExpiringEvents();
       const expiringJobs = this.getExpiringJobs();
       return (
         <div className={classes.root}>
           <AppBar position="static">
             <Tabs value={value} onChange={this.handleChange}>
               <Tab label="Google Analytics" />
               <Tab label="General Metrics" />
               <Tab label="Expiring Soon" />
             </Tabs>
           </AppBar>
           {value === 0 && <TabContainer><Analytics /></TabContainer>}
           {value === 1 && (
           <TabContainer>
             <GeneralMetrics
               newCompanies={newCompanies}
               totalCompanies={totalCompanies}
               newJobs={newJobs}
               totalJobs={totalJobs}
               newConsultants={newConsultants}
               totalConsultants={totalConsultants}
               newEvents={newEvents}
               totalEvents={totalEvents}
             />

           </TabContainer>
           )}
           {value === 2 && <TabContainer><ExpiringSoon expiringJobs={expiringJobs} expiringEvents={expiringEvents} /></TabContainer>}
         </div>
       );
     }
}
export default MainDashboard;
