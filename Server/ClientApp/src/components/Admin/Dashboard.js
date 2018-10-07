import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import JobManagement from './JobManagement/JobManagement';
import UserManagement from './UserManagement/UserManagement';

import { mainListItems, secondaryListItems } from './listitems';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
    dashboard: 'UserManagement',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

   dBoard = () => {
     const { classes } = this.props;
     if (this.state.dashboard === 'UserManagement') {
       return (
         <main className={classes.content}>
           <div className={classes.appBarSpacer} />

           <Typography variant="display1" gutterBottom>
         User Management
           </Typography>
           <div className={classes.tableContainer}>
             <UserManagement />
           </div>
         </main>
       );
     }
     if (this.state.dashboard === 'Dashboard') {
       return (
         <main className={classes.content}>
           <div className={classes.appBarSpacer} />
           <Typography variant="display1" gutterBottom>
        Main Dashboard
           </Typography>
         </main>
       );
     }
     if (this.state.dashboard === 'CompanyManagement') {
       return (
         <main className={classes.content}>
           <div className={classes.appBarSpacer} />
           <Typography variant="display1" gutterBottom>
        Company Management
           </Typography>
         </main>

       );
     }
     if (this.state.dashboard === 'EventManagement') {
       return (
         <main className={classes.content}>
           <div className={classes.appBarSpacer} />
           <Typography variant="display1" gutterBottom>
        Event Management
           </Typography>
         </main>

       );
     }
     if (this.state.dashboard === 'JobManagement') {
       return (
         <main className={classes.content}>
           <div className={classes.appBarSpacer} />
           <Typography variant="display1" gutterBottom>
        Job Management
           </Typography>
           <div className={classes.tableContainer}>
             <JobManagement />
           </div>
         </main>

       );
     }
   }


   handleViewChange = (id, e) => {
     this.setState({ dashboard: id });
     e.preventDefault;
   }

   render() {
     const { classes } = this.props;
     const board = this.dBoard();


     return (
       <React.Fragment>
         <CssBaseline />
         <div className={classes.root}>

           <Drawer
             variant="permanent"
             classes={{
               paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
             }}
             open={this.state.open}
           >
             <div className={classes.toolbarIcon}>
               <IconButton onClick={this.handleDrawerClose}>
                 <ChevronLeftIcon />
               </IconButton>
             </div>
             <Divider />
             <List>
               <ListItem button>
                 <ListItemIcon>
                   <DashboardIcon />
                 </ListItemIcon>
                 <ListItemText onClick={e => this.handleViewChange('Dashboard', e)} primary="Dashboard" />
               </ListItem>
               <ListItem button>
                 <ListItemIcon>
                   <PeopleIcon />
                 </ListItemIcon>
                 <ListItemText onClick={e => this.handleViewChange('UserManagement', e)} primary="User Management" />
               </ListItem>
               <ListItem button>
                 <ListItemIcon>
                   <BarChartIcon />
                 </ListItemIcon>
                 <ListItemText onClick={e => this.handleViewChange('CompanyManagement', e)} primary="Company Management" />
               </ListItem>
               <ListItem button>
                 <ListItemIcon>
                   <LayersIcon />
                 </ListItemIcon>
                 <ListItemText onClick={e => this.handleViewChange('EventManagement', e)} primary="Events Management" />
               </ListItem>
               <ListItem button>
                 <ListItemIcon>
                   <LayersIcon />
                 </ListItemIcon>
                 <ListItemText onClick={e => this.handleViewChange('JobManagement', e)} primary="Job Management" />
               </ListItem>
             </List>
             <Divider />
             <List>{secondaryListItems}</List>
           </Drawer>
           {board}
         </div>
       </React.Fragment>
     );
   }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
