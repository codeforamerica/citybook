import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Row from 'react-bootstrap/lib/Row';

import '../../styles/styles.scss';

export default class TopNav extends Component {
  constructor(){
    super();
    this.state = {
      searchInput: ''
    }
  }
  handleSelect(){
    console.log('selected');
  }
  render() {
    return (
      <Navbar className="citybook-header affix">
        <Navbar.Header className="hidden-sm hidden-xs">
          <Navbar.Brand>
            <a href="/">CityBook</a>
          </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Row>
          <Navbar.Form className='main-search' pullLeft>
              <FormGroup style={{display: 'inline'}}>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon className='result-button-icon' glyph='search' />
                  </InputGroup.Addon>
                  <FormControl onChange={this.props.setSearchInput} type="text" placeholder="Search..." />
                </InputGroup>
              </FormGroup>
          </Navbar.Form>
          <Navbar.Collapse>
          <Nav pullRight>
              <NavItem href="#" onClick={this.props.sidebarToggle}><Glyphicon glyph="menu-hamburger" /> Menu</NavItem>
          </Nav>
          </Navbar.Collapse>
        </Row>
      </Navbar>
    );
  }
}
