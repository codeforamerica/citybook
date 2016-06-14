import React, { Component } from 'react';
import { Row, Col, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import TosModal from '../TosModal.react.js';
import '../../../styles/instructions.scss';
import $ from 'jquery';

export default class Step3 extends Component {
  constructor(){
    super();
    this.state = {
      spreadSheetLink: '',
      linkStatus: '',
      createButtonDisabled: true
    }
    this.onChange = this.onChange.bind(this);
    this.createBook = this.createBook.bind(this);
  }
  onChange(event) {
    let
      spreadSheetKey,
      spreadSheetLink = event.target.value;

      if(!event.target.value){
        console.log('link is empty')
        this.setState({
          linkStatus: 'empty',
          createButtonDisabled: true
        })
        return;
      }

      if(/https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*)\//.test(spreadSheetLink)){
        console.log('link matches regex');
        spreadSheetKey = spreadSheetLink.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*)\//)[1];
      } else {
        console.log('bad-format');
        this.setState({
          linkStatus: 'bad-format',
          createButtonDisabled: true
        })
      }

      $.get({
        url: 'https://spreadsheets.google.com/feeds/list/' + spreadSheetKey + '/1/public/full?alt=json',
        dataType: 'json',
        success: this.connectionSuccess,
        error: this.connectionError
      });

      this.connectionSuccess = function(data){
        console.log('success!')
        this.setState({
          linkStatus: 'success',
          createButtonDisabled: false,
          spreadSheetLink: spreadSheetKey
        })
      }.bind(this)

      this.connectionError = function(err){
        console.error('no connection!');
        this.setState({
          linkStatus: 'bad-connection',
          createButtonDisabled: true
        })
      }.bind(this)
  }

  createBook(){
    let book_reference = {
      title: 'test title',
      link: this.state.spreadSheetLink,
      opt_in: 'true'
    }
    $.ajax({
      url: '/api/books',
      dataType: 'json',
      type: 'POST',
      data: book_reference,
      success: function(data) {
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    console.log('user wants to create a new book')
  }

  render(){
    let linkStatus;
    if(this.state.linkStatus === 'empty'){
      linkStatus = ''
    }

    if (this.state.linkStatus === 'bad-format') {
      linkStatus = (
        <Alert bsStyle="danger">
          <strong>Warning:</strong> That link doesn't look right. Make sure you're copying the entire link from the "Publish to Web" modal.
        </Alert>
      )
    }

    if (this.state.linkStatus === 'bad-connection') {
      linkStatus = (
        <Alert bsStyle="danger">
          <strong>Warning:</strong> We couldn't connect to your Google Spreadsheet. Check your spreadsheet permissions.
        </Alert>
      )
    }

    if (this.state.linkStatus === 'success') {
      linkStatus = (
        <Alert bsStyle="success">
          Your link looks good!
        </Alert>
      )
    }
    return(
      <div>
        <Row class="row">
          <Col sm={12}>
            <p>Paste your spreadsheet's public link here:</p>
          </Col>
          <Col sm={12}>
            <InputGroup class="input-group">
              <InputGroup.Addon>Spreadsheet Link:</InputGroup.Addon>
              <FormControl onChange={this.onChange.bind(this)} class="form-control" id="spreadsheet-key" label="Spreadsheet URL" placeholder="Spreadsheet URL" type="text"></FormControl>
            </InputGroup>
          </Col>
        </Row>
        <br/>
        <Row>
          <Col sm={12}>
            {linkStatus}
          </Col>
        </Row>
        <Button href="#" onClick={this.createBook} bsSize="large" id="citybook-test" className="btn-blue" disabled={this.state.createButtonDisabled}>Create your CityBook</Button>
        <br/>
        <Row>
          <Col sm={12}>
            <p>Adjust other settings here:</p>
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
        <p>By creating a CityBook, you agree to our <TosModal />.</p>
      </div>
    )
  }
}
