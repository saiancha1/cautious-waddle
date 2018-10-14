import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Analytics from './Analytics';

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
    };

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

     render() {
       const classes = this.styles;
       const { value } = this.state;
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
           {value === 1 && <TabContainer>Item Two</TabContainer>}
           {value === 2 && <TabContainer>Item Three</TabContainer>}
         </div>
       );
     }
}
export default MainDashboard;
