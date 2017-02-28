import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner.react.js';
import Grid from 'react-bootstrap/lib/Grid';
import ResultsList from './ResultsList.react.js';
import ResultFilters from './ResultFilters.react.js';
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
        <ResultFilters loaded={this.props.loaded} filterOptions={this.props.filterOptions} setFilters={this.props.setFilters} />
        <ResultsList loaded={this.props.loaded} results={this.props.results}/>
      </Grid>
    )
  }
}
