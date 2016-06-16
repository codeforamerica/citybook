import React, { Component } from 'react';
import { Row, Col, Button, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import '../../../styles/instructions.scss';

export default class Step4 extends Component {
  render(){
    return(
      <Row>
        <Col md={12}>
          <p>Embed this code on your website, just like a YouTube video.</p>
        </Col>
        <Col md={12}>
          <InputGroup>
            <InputGroup.Button>
              <Button data-clipboard-target="#embed-output" type="button">
                <Glyphicon glyph="copy" aria-hidden="true"></Glyphicon> Copy Embed:
              </Button>
            </InputGroup.Button>
            <FormControl id="embed-output" type="text" value={this.props.embed} placeholder="Your embed will appear here..."/>
          </InputGroup>
        </Col>
        <Col md={12}>
          <InputGroup>
            <InputGroup.Button>
              <Button data-clipboard-target="#link-output" type="button">
                <Glyphicon glyph="copy" aria-hidden="true"></Glyphicon> Copy Link:
              </Button>
            </InputGroup.Button>
            <FormControl id="link-output" type="text" value={this.props.link} placeholder="Your link will appear here..."/>
          </InputGroup>
          <Button href={'/#/books/' + this.props.sskey} bsSize="large" id="citybook-test" target="_blank" className="btn-blue">Test your CityBook</Button>
        </Col>
        <br/>
      </Row>
    )
  }
}
