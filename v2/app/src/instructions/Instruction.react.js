import React, { Component } from 'react';

export default class Instruction extends Component {
  render(){
    let stepNumber;
    if(this.props.number){
      stepNumber = <span className='step-number'>Step: {this.props.number}</span>;
    } else {
      stepNumber = '';
    }
    return(
      <section className='instruction-step'>
        <h1>
          {stepNumber}
          <span> {this.props.title}</span>
        </h1>
        <div>
          {this.props.children}
        </div>
      </section>
    )
  }
}
