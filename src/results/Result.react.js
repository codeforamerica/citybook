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
    telephone = resultInfo['Telephone'],
    typeOfProgram = resultInfo['Type of Program'];

    let moreInfo = Object.keys(resultInfo).map(function(result, i){
      if(resultInfo.hasOwnProperty(result) && result !=='Lattitude' && result !== 'Longitude'){
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
            <h3 className='result-title'>{organizationName}</h3>
          </Col>
          <Col xs={12}>
            <Row>
            <Col xs={4} className="button-container">
              <Button bsSize='large' className='btn-block card-button' href="#" onClick={ ()=> this.setState({ panelOpen: !this.state.panelOpen })}>
                <span className="result-button-label"><Glyphicon className='result-button-icon' glyph={ panelOpenIcon + '-sign'} /> Info</span>
              </Button>
            </Col>
            <Col xs={4} className="button-container">
              <Button bsSize='large' target='_blank' rel="noopener" className='btn-block card-button' href={'https://maps.google.com/?q=' + address}>
                <span className="result-button-label"><Glyphicon className='result-button-icon' glyph='map-marker' /> Map</span>
              </Button>
            </Col>
            <Col xs={4} className="button-container">
              <Button bsSize='large' className='btn-block card-button' href={'tel:'+telephone}>
                <span className="result-button-label"><Glyphicon className='result-button-icon' glyph='earphone' /> Call</span>
              </Button>
            </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Panel className='more-info' collapsible expanded={this.state.panelOpen}>
            <ul className="list-group">
              {moreInfo}
            </ul>
          </Panel>
        </Row>
      </Panel>
      </Col>
    )
  }
}
