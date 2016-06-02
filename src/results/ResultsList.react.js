import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner.react.js';
import Result from './Result.react.js';
import '../../styles/loading-spinner.scss';

export default class ResultsList extends Component {
  constructor(){
    super();
  }
  render() {
    let list;
    let errors;
    if(this.props.erros){
      console.error(error);
    }
    if(this.props.loaded){
      let resultsList = this.props.results;

      resultsList.sort(function(a, b){
        if(a['Organization Name'] < b['Organization Name']) return - 1;
        if(a['Organization Name'] > b['Organization Name']) return 1;
        return 0;
      });

      list = resultsList.map(function(result, i){
        let resultName = result['Organization Name']
        return (
          <Result key={i} result={result} />
        )
      })
    } else {
      list = <LoadingSpinner />
    }
    return(
        <ul className='results-list'>
          {list}
        </ul>
    )
  }
}
