import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import TopNav from './navigation/topNav.react.js';
import ErrorBar from './ErrorBar.react.js';
import getSpreadsheetData from './scripts/getSpreadsheetData.js';
import ResultListWrapper from './results/ResultListWrapper.react.js';
import fuzzy from 'fuzzy';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      initialLoadComplete: false,
      errors: '',
      filterOptions: '',
      results:'',
      filteredResults: '',
      searchInput: '',
    }

    this.updateState = this.updateState.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);

    this.componentWillMount = this.componentWillMount.bind(this);
  }
  updateState(loadState, filterOptions, results, error){
    this.setState({
      initialLoadComplete: loadState,
      filterOptions: filterOptions,
      results: results,
      filteredResults: results,
      errors: error
    })
  }

  setSearchInput(event) {
    var
      list = this.state.results,
      options = {
        extract: function(obj){return obj['Organization Name'] + ' ' +  obj['Address']}
      },
      results = fuzzy.filter(event.target.value, list, options),
      matches = results.map(function(el){ return el.index; }),
      arrayLength = matches.length,
      filteredResults = [];
      
    for (var i = 0; i < arrayLength; i++) {
      filteredResults.push(this.state.results[matches[i]])
    }
    this.setState({filteredResults: filteredResults, searchInput: event.target.value});
  }
  componentWillUpdate(){

  }
  componentWillMount(){
    getSpreadsheetData(this.props.params.bookId, this.updateState);
    this.setState({
      spreadsheetId: this.props.params.bookId
    });
  }

  render() {
    let errors;
    if(this.state.errors){
      errors = <h1>There was an error</h1>
    }
    return (
      <div>
        <TopNav
          loaded={this.state.initialLoadComplete}
          spreadsheetId={this.props.params.bookId}
          filterOptions={this.state.filterOptions}
          results={this.state.filteredResults}
          setSearchInput={this.setSearchInput}/>

        <ErrorBar errors={this.state.errors} />

        <ResultListWrapper
          loaded={this.state.initialLoadComplete}
          errors={this.state.errors}
          results={this.state.filteredResults} />
      </div>
    );
  }
}
