import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner.react.js';
import { Grid } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ResultsList from './ResultsList.react.js';
import '../../styles/loading-spinner.scss';
import '../../styles/styles.scss';


export default class ResultListWrapper extends Component {
  constructor(){
    super();
    this.state = {
    }
  }
  render(){
    return(
      <Grid>
        <ReactCSSTransitionGroup transitionName="results-list" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            <ResultsList loaded={this.props.loaded} results={this.props.results}/>
        </ReactCSSTransitionGroup>
      </Grid>
    )
  }
}
