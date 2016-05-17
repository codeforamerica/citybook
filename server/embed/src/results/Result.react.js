import React, { Component } from 'react';
import { Panel, Row, Col, Button, Glyphicon } from 'react-bootstrap';

export default class Result extends Component {
  constructor(){
    super();
    this.state = {
      panelOpen: false
    }
  }
  render() {
    let resultInfo = this.props.result,
    organizationName = resultInfo['Organization Name'],
    address = resultInfo['Address'],
    telephone = resultInfo['Telephone'],
    typeOfProgram = resultInfo['Type of Program'];

    let moreInfo = Object.keys(resultInfo).map(function(result, i){
      console.log(resultInfo[result]);
      if(resultInfo.hasOwnProperty(result)){
        return (
          <li><strong>{result + ': '}</strong>{resultInfo[result]}</li>
        )
      }
    });

    return(
      <Panel>
        <Row>
          <Col sm={6}>
            <h1>{organizationName}</h1>
            <span>{typeOfProgram}</span>
          </Col>
          <Col sm={2} className='text-center'>
            <Button className="result-button" target='_blank' href={'https://maps.google.com/?q=' + address} block>
            <Row>
              <Col xs={2} sm={12}>
                <Glyphicon className='result-button-icon' glyph='map-marker' />
              </Col>
              <Col xs={10} sm={12}>
                Directions
              </Col>
            </Row>
            </Button>
          </Col>
          <Col sm={2} className='text-center'>
            <Button className="result-button" href={'tel:'+telephone} block>
            <Row>
              <Col xs={2} sm={12}>
                <Glyphicon className='result-button-icon' glyph='earphone' />
              </Col>
              <Col xs={10} sm={12}>
              {telephone}
              </Col>
            </Row>
            </Button>
          </Col>
          <Col sm={2} className='text-center'>
            <Button className="result-button" href="#" block onClick={ ()=> this.setState({ panelOpen: !this.state.panelOpen })}>
              <Glyphicon className='result-button-icon' glyph='plus-sign' />
              <br/>
              More Info
            </Button>
          </Col>
        </Row>
        <Panel className='more-info' collapsible expanded={this.state.panelOpen}>
          {moreInfo}
        </Panel>
      </Panel>
    )
  }
}
