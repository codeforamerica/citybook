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
      if(resultInfo.hasOwnProperty(result)){
        return (
          <li key={i}><strong>{result + ': '}</strong>{resultInfo[result]}</li>
        )
      }
    });

    let panelOpenText = this.state.panelOpen ? 'Hide' : 'Show';
    let panelOpenIcon = this.state.panelOpen ? 'minus' : 'plus';

    return(
      <Panel>
        <Row>
          <Col sm={6}>
            <h1>{organizationName}</h1>
            <span>{typeOfProgram}</span>
          </Col>
          <Col xs={4} sm={2} className='text-center'>
            <Button className="result-button" target='_blank' href={'https://maps.google.com/?q=' + address} block>
            <Row>
              <Glyphicon className='result-button-icon' glyph='map-marker' />
              <br/>
              Directions
            </Row>
            </Button>
          </Col>
          <Col xs={4} sm={2} className='text-center'>
            <Button className="result-button" href={'tel:'+telephone} block>
            <Row>
              <Glyphicon className='result-button-icon' glyph='earphone' />
              <br/>
              { telephone }
            </Row>
            </Button>
          </Col>
          <Col xs={4} sm={2} className='text-center'>
            <Button className="result-button" href="#" block onClick={ ()=> this.setState({ panelOpen: !this.state.panelOpen })}>
              <Glyphicon className='result-button-icon' glyph={ panelOpenIcon + '-sign'} />
              <br/>
              { panelOpenText } Details
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
