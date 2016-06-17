import React, { Component } from 'react';
import { Panel, Row, Col, Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

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

    let panelOpenIcon = this.state.panelOpen ? 'minus' : 'plus';

    return(
      <Panel>
        <Row>
          <Col xs={12} sm={5}>
            <h2 className='result-title'>{organizationName}</h2>
            <p>{ address }</p>
            <p>{ telephone }</p>
          </Col>
          <Col xs={12} sm={7} className='button-container'>
              <Button bsSize='large' className='result-button green' href={'tel:'+telephone}>
                <Glyphicon className='result-button-icon' glyph='earphone' />
                <span> Call Phone</span>
              </Button>
              <Button bsSize='large' className='result-button' target='_blank' href={'https://maps.google.com/?q=' + address}>
                <Glyphicon className='result-button-icon' glyph='map-marker' />
                <span> Open Map</span>
              </Button>
              <Button bsSize='large' className='result-button' href="#" onClick={ ()=> this.setState({ panelOpen: !this.state.panelOpen })}>
                <Glyphicon className='result-button-icon' glyph={ panelOpenIcon + '-sign'} />
                <span> Details</span>
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
