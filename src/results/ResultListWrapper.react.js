import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner.react.js';
import Grid from 'react-bootstrap/lib/Grid';
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
        <ResultsList loaded={this.props.loaded} results={this.props.results}/>
      </Grid>
    )
  }
}
