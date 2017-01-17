import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import FormGroup from 'react-bootstrap/lib/FormGroup';
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

  render() {
    return (
      <div>
        <Navbar className="citybook-header affix">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">CityBook</a>
            </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Row>
            <Navbar.Form className='main-search' pullLeft>
                <FormGroup style={{display: 'inline'}}>
                  <FormControl onChange={this.props.setSearchInput} type="text" placeholder="Search..." />
                </FormGroup>
            </Navbar.Form>
          <Navbar.Collapse>

            <Nav pullRight>
              <NavItem eventKey={1} href={"https://docs.google.com/spreadsheets/d/" + this.props.spreadsheetId} target="_blank" rel="noopener"><Glyphicon glyph='th-list'/> Data Source</NavItem>
              <NavItem eventKey={2} href="#" onClick={ ()=> window.print()}><Glyphicon glyph='print'/> Print</NavItem>
            </Nav>
          </Navbar.Collapse>
          </Row>
        </Navbar>
        </div>
    );
  }
}
