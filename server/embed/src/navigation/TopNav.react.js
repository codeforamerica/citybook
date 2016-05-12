import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, form, FormGroup, FormControl } from 'react-bootstrap';

export default class TopNav extends Component {
  render() {
    let filterOptions = this.props.filterOptions.map(function(option, i){
      return <MenuItem key={i} eventKey={i}>{option}</MenuItem>
    });
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
            {filterOptions}
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
