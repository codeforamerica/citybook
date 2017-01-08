import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, FormControl, ControlLabel, Alert } from 'react-bootstrap';
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

      if(/https:\/\/docs\.google\.com\/spreadsheets\/d\/(.*)\//.test(spreadSheetLink)){
        console.log('link matches regex');
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
    var citybookLink = 'http://www.citybook.io/#/books/' + this.state.uuid;
    var citybookEmbed = '<iframe src="' + citybookLink + '" width="100%" height="800px" frameboarder="0"></iframe>'
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
          <Row class="row">
            <Col sm={12}>
              <FormGroup>
                <ControlLabel>Paste your spreadsheet's public link here:</ControlLabel>
                <FormControl onChange={this.onChange.bind(this)} class="form-control" id="spreadsheet-key" label="Spreadsheet URL" placeholder="Spreadsheet URL" type="text"></FormControl>
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
