import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
