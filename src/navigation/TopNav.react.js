import React, { Component } from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, form, FormGroup, FormControl, Glyphicon } from 'react-bootstrap';
import ReactTypeahead from 'react-typeahead';
import Dropdown from 'react-dropdown';
import '../../styles/styles.scss';

//const Typeahead = require('react-typeahead').Typeahead;

export default class TopNav extends Component {
  constructor(){
    super();
    this.state = {
      searchInput: ''
    }
  }
  _onSelect(){
    console.log('New slection!')
  }
  render() {
    let
      filterOptions,
      searchFilter,
      typeAhead;
    console.log(this.props.results)
    if(this.props.loaded){
      searchFilter = (
        <Dropdown
          options={this.props.filterOptions}
          onChange={this._onSelect}
          placeholder="All Categories"
        />
      )

      typeAhead = (
        <ReactTypeahead.Typeahead
          options={ this.props.results }
          maxVisible={5}
          placeholder='Search...'
          filterOption='Organization Name'
          displayOption='Organization Name'
          onOptionSelected={ function(e){console.log(e)} }
          customClasses={{
            input: 'form-control',
            typeahead: 'topcoat-list',
            results: 'list-group',
            listItem: 'list-group-item',
          }}
        />
      )
    } else {
      filterOptions = <NavItem eventKey={1} href="#">Loading...</NavItem>
      typeAhead = (
          <ReactTypeahead.Typeahead
            options={'none'}
            maxVisible={3}
            disabled
            customClasses={{
              input: 'form-control',
              typeahead: 'topcoat-list',
              results: 'list-group',
              listItem: 'list-group-item',
            }}
          />
      )
    }
    return (
      <div>
        <Navbar className="citybook-header">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="https://citybook.io">CityBook</a>
            </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Form pullLeft>
            <FormGroup style={{display: 'inline'}}>
            {typeAhead}
            </FormGroup>
          </Navbar.Form>
          <Navbar.Collapse>
            <Nav>
              {searchFilter}
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1} href={'https://docs.google.com/spreadsheets/d/'+ this.props.spreadsheetId} target="_blank"><Glyphicon glyph='th-list'/> Data Source</NavItem>
              <NavItem eventKey={2} href="#" onClick={ ()=> window.print()}><Glyphicon glyph='print'/> Print</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        </div>
    );
  }
}
