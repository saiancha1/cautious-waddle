import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Login from '../Authentication/Login';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
              </NavItem>
              <NavItem eventKey={2} componentClass={Link} href="/companies" to="/companies">
              Companies
              </NavItem>
              <NavItem eventKey={3} componentClass={Link} href="/consultants" to="/consultants">
              Consultants
              </NavItem>
              <NavItem eventKey={4} componentClass={Link} href="/work" to="/work">
              Work
              </NavItem>
              <NavItem eventKey={5} componentClass={Link} href="/events" to="/events">
              Events
              </NavItem>
              <NavItem eventKey={6} componentClass={Link} href="/contact" to="/contact">
              Contact
              </NavItem>
              <NavItem eventKey={7} componentClass={Link} href="/subscribe" to="/subscribe">
              Subscribe
              </NavItem>
              <NavItem eventKey={8} componentClass={Link} href="/summertech" to="/summertech">
              SummerTech
              </NavItem>
              <Login />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
export default NavBar;
