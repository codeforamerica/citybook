import React, { Component } from 'react';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import FontAwesome from 'react-fontawesome';
import '../styles/loading-spinner.scss';


export default class LoadingSpinner extends Component {
  constructor(){
    super();
  }
  render() {
    return (
      <div className='loading-spinner-container '>
        <FontAwesome name='refresh' size='4x' spin />
      </div>
    );
  }
}
