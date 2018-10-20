import React, { Component } from 'react';
import ResponsiveMenu from 'react-responsive-navbar';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Login from '../Authentication/Login';


class NavBar extends Component {
  render() {
    return (
      <div className="navbar-Wrapper">
        <ResponsiveMenu
          menuOpenButton={<FontAwesomeIcon className="nav-icon" icon={faBars} />}
          menuCloseButton={<FontAwesomeIcon className="nav-icon" icon={faTimes} />}
          changeMenuOn="700px"
          largeMenuClassName="large-menu"
          smallMenuClassName="small-menu"
          menu={(
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/companies">Companies</Link></li>
              <li><Link to="/consultants">Consultants</Link></li>
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          )}
        />
      </div>
    );
  }
}
export default NavBar;
