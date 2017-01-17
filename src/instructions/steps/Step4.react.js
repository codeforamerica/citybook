import React, { Component } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import '../../../styles/instructions.scss';

export default class Step4 extends Component {
  render(){
    return(
      <Row>
        <Col md={12}>
          <p>Embed this code on your website, just like a YouTube video.</p>
        </Col>
        <Col md={12}>
          <FormGroup>
            <ControlLabel>Copy your CityBook embed here:</ControlLabel>
            <FormControl disabled={this.props.disabled} id="embed-output" type="text" value={this.props.embed} placeholder="Your embed will appear here..."/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Or use the direct link to your CityBook:</ControlLabel>
            <FormControl disabled={this.props.disabled} id="embed-output" type="text" value={this.props.embed} placeholder="Your direct link will appear here..."/>
          </FormGroup>
          <Button href={'/#/books/' + this.props.sskey} bsSize="large" id="citybook-test" target="_blank" className="btn-blue">Test your CityBook <Glyphicon glyph='new-window' /></Button>
        </Col>
      </Row>
    )
  }
}
