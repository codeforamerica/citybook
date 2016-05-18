import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';

export default class TopNav extends Component {
  constructor(){
    super();
  }
  render() {
    let filterOptions;
    if(this.props.loaded){
      filterOptions = this.props.filterOptions.map(function(option, i){
        return <MenuItem key={i} eventKey={i}>{option}</MenuItem>
      });
    } else {
      filterOptions = <NavItem eventKey={1} href="#">Loading...</NavItem>
    }
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
              <NavItem eventKey={1} href={'https://docs.google.com/spreadsheets/d/'+ this.props.spreadsheetId} target="_blank"><Glyphicon glyph='th-list'/> Data Source</NavItem>
              <NavItem eventKey={2} href="#" onClick={ ()=> window.print()}><Glyphicon glyph='print'/> Print</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}
