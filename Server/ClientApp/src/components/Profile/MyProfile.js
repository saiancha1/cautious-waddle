import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import ProfileDetails from './ProfileDetails';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});


class MyProfile extends React.Component {
    state = {
      value: 0,
      profileDetails: null,
    };

    componentWillMount() {
      fetch('api/profiles/getMyProfile', {
        method: 'GET',
        headers: {
        // 'Content-Type': 'multipart/formdata',
          Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        },
      }).then(res => res.json())
        .then((json) => {
          this.setState({ profileDetails: json });
        })
        .catch(alert('An Error has occured. Please Try again'));
    }

    handleChange = (event, value) => {
      this.setState({ value });
    };

    handleProfileDetailsChange = (e, val) => {
      const profile = this.state.profileDetails;
      profile[val] = e.target.value;
      this.setState({ profileDetails: profile });
    };

    render() {
      const { value } = this.state;
      return (
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Item One" icon={<PhoneIcon />} />
              <Tab label="Item Two" icon={<FavoriteIcon />} />
              <Tab label="Item Three" icon={<PersonPinIcon />} />
              <Tab label="Item Four" icon={<HelpIcon />} />
              <Tab label="Item Five" icon={<ShoppingBasket />} />
              <Tab label="Item Six" icon={<ThumbDown />} />
              <Tab label="Item Seven" icon={<ThumbUp />} />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><ProfileDetails handleChange={this.handleProfileDetailsChange} profile={this.state.profileDetails}/></TabContainer>}
          {value === 1 && <TabContainer>Item Two</TabContainer>}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
          {value === 3 && <TabContainer>Item Four</TabContainer>}
          {value === 4 && <TabContainer>Item Five</TabContainer>}
          {value === 5 && <TabContainer>Item Six</TabContainer>}
          {value === 6 && <TabContainer>Item Seven</TabContainer>}
        </div>
      );
    }
}
export default MyProfile;
