import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, form, FormGroup, FormControl } from 'react-bootstrap';

export default class TopNav extends Component {
  render() {
    return (
      <Navbar className="citybook-header">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="https://citybook.io">CityBook</a>
          </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Form pullLeft>
          <FormGroup>
            <FormControl type="text" placeholder="Search..." />
          </FormGroup>
        </Navbar.Form>
        <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={3} title="All Categories" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
          </NavDropdown>
        </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Data Source</NavItem>
            <NavItem eventKey={2} href="#">Help</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
