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
          <Col xs={9}>
            <h1>{organizationName}</h1>
            <blockquote> <p> {typeOfProgram} </p> </blockquote>
          </Col>
          <Col xs={3} className='text-center'>
            <Button className="result-button" href="#" block onClick={ ()=> this.setState({ panelOpen: !this.state.panelOpen })}>
              <Glyphicon className='result-button-icon' glyph={ panelOpenIcon + '-sign'} />
              <br/>
              { panelOpenText } Details
            </Button>
          </Col>
          <Col xs={12}>
            <Button className="result-button" target='_blank' href={'https://maps.google.com/?q=' + address} >
              <Glyphicon className='result-button-icon' glyph='map-marker' />
              { address }
            </Button>
          </Col>
          <Col xs={12}>
            <Button className="result-button" href={'tel:'+telephone} >
              <Glyphicon className='result-button-icon' glyph='earphone' />
              { telephone }
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
