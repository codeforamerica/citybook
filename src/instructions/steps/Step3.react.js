import React, { Component } from 'react';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Alert from 'react-bootstrap/lib/Alert';


import TosModal from '../TosModal.react.js';
import '../../../styles/instructions.scss';
import $ from 'jquery';
import Instruction from '../Instruction.react.js';
import Step4 from './Step4.react.js';


export default class Step3 extends Component {
  constructor(){
    super();
    this.state = {
      spreadSheetLink: '',
      linkStatus: '',
      citybookCreated: false,
      createButtonDisabled: true,
      uuid: '',
      citybookLink: '',
      citybookEmbed: ''
    }
    this.onChange = this.onChange.bind(this);
    this.createBook = this.createBook.bind(this);
  }
  onChange(event) {
    var
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
      // Test if link matches regex
      if(/https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*)\//.test(spreadSheetLink)){
        spreadSheetKey = spreadSheetLink.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*)\//)[1];

        this.connectionSuccess = function(data){
          console.log(spreadSheetKey)
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

        // Test if we can get data from the spreadsheet
        $.get({
          url: 'https://spreadsheets.google.com/feeds/list/' + spreadSheetKey + '/1/public/full?alt=json',
          dataType: 'jsonp',
          success: this.connectionSuccess,
          error: this.connectionError
        });

      } else {
        console.log('bad-format');
        this.setState({
          linkStatus: 'bad-format',
          createButtonDisabled: true
        })
      }


  }

  createBook(){
    var book_reference = {
      link: this.state.spreadSheetLink,
    }

    $.ajax({
      url: '/api/books',
      dataType: 'json',
      type: 'POST',
      data: book_reference,
      success: function(data) {
        this.setState({
          citybookCreated: true,
          uuid: data
        })
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render(){
    if (this.state.citybookCreated == false){
      var
        citybookLink,
        citybookEmbed;
    } else {
      var
        citybookLink = 'https://www.citybook.io/#/books/' + this.state.uuid,
        citybookEmbed = '<iframe src="' + citybookLink + '" width="100%" height="800px" frameboarder="0"></iframe>'
    }
    var linkStatus;
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
        <Instruction number='3' title="Paste Your Spreadsheet's Public Link">
          <Row>
            <Col sm={12}>
              <FormGroup>
                <ControlLabel>Paste your spreadsheet's public link here:</ControlLabel>
                <FormControl onChange={this.onChange.bind(this)} id="spreadsheet-key" label="Spreadsheet URL" placeholder="Spreadsheet URL" type="text"></FormControl>
              </FormGroup>
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
          <p>By creating a CityBook, you agree to our <TosModal />.</p>
        </Instruction>
        <Instruction number='4' title="Grab the Embed Code">
          <Step4 embed={citybookEmbed} link={citybookLink} sskey={this.state.uuid} disabled={this.state.createButtonDisabled} />
        </Instruction>
      </div>
    )
  }
}
