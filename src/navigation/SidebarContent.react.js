import React, { Component } from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Button from 'react-bootstrap/lib/Button';

export default class SidebarContent extends Component {
  constructor(){
    super();
  }

  render(){
    return(
      <div style={{padding: 20}}>

      <Button onClick={this.props.sidebarToggle} block><Glyphicon glyph='remove-sign'/> Close</Button>
      <hr />
      <Nav bsStyle="pills" stacked activeKey={1}>
        <NavItem href={"/#/books"}><Glyphicon glyph='th-list'/> My Contact Lists</NavItem>
        <NavItem disabled><Glyphicon glyph='globe'/> Map</NavItem>
        <NavItem href={"https://docs.google.com/spreadsheets/d/" + this.props.spreadsheetId} target="_blank" rel="noopener"><Glyphicon glyph='new-window'/> Data Source</NavItem>
        <NavItem href="#" onClick={ ()=> window.print()}><Glyphicon glyph='print'/> Print</NavItem>
      </Nav>
      </div>
    )
  }
}
