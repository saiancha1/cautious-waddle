import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import SecurityIcon from '@material-ui/icons/Security';
import PersonIcon from '@material-ui/icons/Person';
import Fade from '@material-ui/core/Fade/Fade';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});


function HeaderMenu(props) {
  const { classes } = props;
  const { open } = props.open;
  return (
    

      <Menu open={props.open}
                TransitionComponent={Fade}
                onClose={props.handleClose}
                >
        <MenuItem className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="My Profile" />
        </MenuItem>
        <MenuItem className={classes.menuItem} hidden={props.isAdmin}>
          <ListItemIcon className={classes.icon}>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Admin" />
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={props.logout}>
          <ListItemIcon className={classes.icon}>
            <PowerOffIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Logout" />
        </MenuItem>
      </Menu>
  );
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderMenu);