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
          menuOpenButton={<FontAwesomeIcon className="fa-icon" icon={faBars} />}
          menuCloseButton={<FontAwesomeIcon className="fa-icon" icon={faTimes} />}
          changeMenuOn="500px"
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


        {/* <Navbar fluid className="navbar-Wrapper">
          <Navbar.Toggle />
          <Navbar.Collapse>
            <div className="navItem-Wrapper">
              <Nav>
                <NavItem className="navItem" eventKey={1} componentClass={Link} href="/" to="/">
              Home
                </NavItem>
                <NavItem className="navItem" eventKey={2} componentClass={Link} href="/companies" to="/companies">
              Companies
                </NavItem>
                <NavItem className="navItem" eventKey={3} componentClass={Link} href="/consultants" to="/consultants">
              Consultants
                </NavItem>
                <NavItem className="navItem" eventKey={4} componentClass={Link} href="/work" to="/work">
              Work
                </NavItem>
                <NavItem className="navItem" eventKey={5} componentClass={Link} href="/events" to={{ pathname: '/events', state: { feature: 'none' } }}>
              Events
                </NavItem>
                <NavItem className="navItem" eventKey={6} componentClass={Link} href="/contact" to="/contact">
              Contact
                </NavItem>
                <NavItem className="navItem" eventKey={7} componentClass={Link} href="/subscribe" to="/subscribe">
              Subscribe
                </NavItem>
                <NavItem className="navItem" eventKey={8} componentClass={Link} href="/summertech" to="/summertech">
                SummerTech
                </NavItem>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar> */}
      </div>
    );
  }
}
export default NavBar;
