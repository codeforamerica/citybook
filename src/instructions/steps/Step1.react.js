import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';


import '../../../styles/instructions.scss';

export default class Step1 extends Component {
  render(){
    return(
      <Row>
        <Col md={10}>
          <p>Use CityBook's Google Spreadsheet template to store your information. Copy the template to your own Google Drive account by clicking the "Use this template" button.</p>
          <Button className="btn-blue" bsSize="large" href="https://drive.google.com/previewtemplate?id=18YIZlfxxlffHVytbR8zY1cvmKShGOK3z_Cf9JYow4pg&mode=public" target='_blank'>Get the Template <Glyphicon glyph='new-window' /></Button>
        </Col>
      </Row>
    )
  }
}
