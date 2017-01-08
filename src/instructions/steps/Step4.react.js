import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel, Glyphicon } from 'react-bootstrap';
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
            <FormControl id="embed-output" type="text" value={this.props.embed} placeholder="Your embed will appear here..."/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Or use the direct link to your CityBook:</ControlLabel>
            <FormControl id="embed-output" type="text" value={this.props.embed} placeholder="Your embed will appear here..."/>
          </FormGroup>
          <Button href={'/#/books/' + this.props.sskey} bsSize="large" id="citybook-test" target="_blank" className="btn-blue">Test your CityBook</Button>
        </Col>
      </Row>
    )
  }
}
