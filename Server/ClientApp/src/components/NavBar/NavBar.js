import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Login from '../Authentication/Login';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar fluid>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <div className="navbarWrapper">
              <Nav>
                <NavItem className="navbarItem" eventKey={1} componentClass={Link} href="/" to="/">
              Home
                </NavItem>
                <NavItem className="navbarItem" eventKey={2} componentClass={Link} href="/companies" to="/companies">
              Companies
                </NavItem>
                <NavItem className="navbarItem" eventKey={3} componentClass={Link} href="/consultants" to="/consultants">
              Consultants
                </NavItem>
                <NavItem className="navbarItem" eventKey={4} componentClass={Link} href="/work" to="/work">
              Work
                </NavItem>
                <NavItem className="navbarItem" eventKey={5} componentClass={Link} href="/events" to="/events">
              Events
                </NavItem>
                <NavItem className="navbarItem" eventKey={6} componentClass={Link} href="/contact" to="/contact">
              Contact
                </NavItem>
                <NavItem className="navbarItem" eventKey={7} componentClass={Link} href="/subscribe" to="/subscribe">
              Subscribe
                </NavItem>
                <NavItem className="navbarItem" eventKey={8} componentClass={Link} href="/summertech" to="/summertech">
              SummerTech
                </NavItem>
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
