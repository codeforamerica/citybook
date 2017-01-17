import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';



export default class Instruction extends Component {
  render(){
    let stepNumber;
    if(this.props.number){
      stepNumber = <h1 className='step-number'>{this.props.number}</h1>;
    } else {
      stepNumber = '';
    }
    return(
      <section className='instruction-step'>
        <Row>
        <Col sm={2}>
          { stepNumber }
        </Col>
        <Col sm={10}>
          <h1>
            <span> {this.props.title}</span>
          </h1>
          <div>
            {this.props.children}
          </div>
        </Col>
        </Row>
      </section>
    )
  }
}
