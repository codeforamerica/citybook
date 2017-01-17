import React, { Component } from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

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
    shortAddress = address.substring(0, 14) + '...',
    telephone = resultInfo['Telephone'],
    typeOfProgram = resultInfo['Type of Program'];

    let moreInfo = Object.keys(resultInfo).map(function(result, i){
      if(resultInfo.hasOwnProperty(result)){
        return (
          <li key={i} className="list-group-item"><strong>{result + ': '}</strong>{resultInfo[result]}</li>
        )
      }
    });

    let panelOpenIcon = this.state.panelOpen ? 'minus' : 'plus';

    return(
      <Col md={6}>
      <Panel>
        <Row>
          <Col xs={12} md={12}>
            <h2 className='result-title'>{organizationName}
              <small>
                <Button className='btn-link' href="#" onClick={ ()=> this.setState({ panelOpen: !this.state.panelOpen })}>
                  <Glyphicon className='result-button-icon' glyph={ panelOpenIcon + '-sign'} />
                  <span className="result-button-label"> Details...</span>
                </Button>
              </small>
            </h2>
          </Col>
          <Col xs={12} md={12}>
            <Row>
            <Col md={6} className="button-container">
              <Button bsSize='large' className='btn-block card-button' target='_blank' rel="noopener" href={'https://maps.google.com/?q=' + address}>
                <span className="result-button-label"><Glyphicon className='result-button-icon' glyph='map-marker' /> Map: { shortAddress }</span>
              </Button>
            </Col>
            <Col md={6} className="button-container">
              <Button bsSize='large' className='btn-block card-button' href={'tel:'+telephone}>
                <span className="result-button-label"><Glyphicon className='result-button-icon' glyph='earphone' /> Call: { telephone }</span>
              </Button>
            </Col>
            </Row>
          </Col>
        </Row>
        <Panel className='more-info' collapsible expanded={this.state.panelOpen}>
          <ul className="list-group">
            {moreInfo}
          </ul>
        </Panel>
      </Panel>
      </Col>
    )
  }
}
