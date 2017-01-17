import React, { Component } from 'react';
import Alert from 'react-bootstrap/lib/Alert';


export default class TopNav extends Component {
  constructor(){
    super();
  }
  render() {
    let error;
    if(this.props.errors){
      error = (
        <Alert bsStyle={this.props.errors.type}>
          {this.props.errors.message}
        </Alert>
      )
    }
    return (
      <span>
        {error}
      </span>
    );
  }
}
