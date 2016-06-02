import React, { Component } from 'react';
import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
import '../../../styles/instructions.scss';

export default class Step3 extends Component {
  constructor(){
    super();
    this.state = {
      typed: ''
    }
  }
  onChange(event) {
    this.setState({typed: event.target.value});
  }
  render(){
    return(
      <div>
        <Row class="row">
          <Col sm={12}>
            <p>Paste your spreadsheet's public link here:</p>
          </Col>
          <Col sm={12}>
            <InputGroup class="input-group">
              <InputGroup.Addon>Spreadsheet Link:</InputGroup.Addon>
              <FormControl onBlur={this.onChange.bind(this)} class="form-control" id="spreadsheet-key" label="Spreadsheet URL" placeholder="Spreadsheet URL" type="text"></FormControl>
            </InputGroup>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={12}>
            <div id="spreadsheet-key-pending" class="alert alert-warning" role="alert"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> Testing your link...</div>
            <div id="spreadsheet-key-success" class="alert alert-success" role="alert"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Your link looks good!</div>
            <div id="spreadsheet-key-error" class="alert alert-danger" role="alert"><strong>Warning:</strong> That link doesn't look right. Make sure you're copying the entire link from the "Publish to Web" modal.</div>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={12}>
            <p>Adjust other settings here:</p>
          </Col>
          <Col sm={4} md={6}>
            <InputGroup class="input-group">
              <InputGroup.Addon class="input-group-addon">Title:</InputGroup.Addon>
              <FormControl class="form-control" id="citybook-title" label="citybook-title" placeholder="CityBook Title" type="text"></FormControl>
            </InputGroup>
          </Col>
          <Col sm={4} md={3}>
            <InputGroup class="input-group">
              <InputGroup.Addon class="input-group-addon">Width:</InputGroup.Addon>
              <FormControl class="form-control text-right" id="citybook-width" label="Height" placeholder="Height" type="text"></FormControl>
              <InputGroup.Addon class="input-group-addon">%</InputGroup.Addon>
            </InputGroup>
          </Col>
          <Col sm={4} md={3}>
            <InputGroup class="input-group">
              <InputGroup.Addon class="input-group-addon">Height:</InputGroup.Addon>
              <FormControl class="form-control text-right" id="citybook-height" label="Width" placeholder="Width" type="text"></FormControl>
              <InputGroup.Addon class="input-group-addon">px</InputGroup.Addon>
            </InputGroup>
          </Col>
        </Row>
        <br/>
        <p>By creating a CityBook, you agree to our <a href="#" data-toggle="modal" data-target="#tos-modal">terms of service.</a></p>
      </div>
    )
  }
}
