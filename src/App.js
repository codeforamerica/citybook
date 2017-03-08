import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import TopNav from './navigation/topNav.react.js';
import ErrorBar from './ErrorBar.react.js';
import getSpreadsheetData from './scripts/getSpreadsheetData.js';
import ResultListWrapper from './results/ResultListWrapper.react.js';
import $ from 'jquery';
import fuzzy from 'fuzzy';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      initialLoadComplete: false,
      errors: '',
      filterOptions: '',
      sheetName: '',
      filterValue: '',
      results:'',
      filteredResults: '',
      searchInput: '',
    }

    this.updateState = this.updateState.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  updateState(loadState, sheetName, filterOptions, results, error){
    this.setState({
      initialLoadComplete: loadState,
      filterOptions: filterOptions,
      sheetName: sheetName,
      results: results,
      filteredResults: results,
      errors: error
    })
  }

  setFilters(event){
    let selectedValue = event.target.value;
    let matchedResults = this.state.results.filter(function(result){
      return selectedValue.length > 0 ? result['category'].trim() === selectedValue.trim() : result;
    })
    this.setState({
      filterValue: event.target.value,
      searchInput: '',
      filteredResults: matchedResults
    });
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
    this.setState({
      filteredResults: filteredResults,
      searchInput: event.target.value
    });
  }

  componentWillMount(){
    $.get('/api/books/' + this.props.params.bookId, function(book_reference){
      var spreadsheetLink = book_reference.google_spreadsheet_link;
      getSpreadsheetData(spreadsheetLink, this.updateState);
      this.setState({
        spreadsheetId: spreadsheetLink
      });
    }.bind(this))
  }

  componentDidUpdate(){
    if(this.state.sheetName){
      localStorage.setItem(this.state.sheetName, this.props.params.bookId);
    }
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
          spreadsheetId={this.state.spreadsheetId}
          results={this.state.filteredResults}
          setSearchInput={this.setSearchInput}/>

        <ErrorBar errors={this.state.errors} />

        <ResultListWrapper
          loaded={this.state.initialLoadComplete}
          errors={this.state.errors}
          filterOptions={this.state.filterOptions}
          setFilters={this.setFilters}
          results={this.state.filteredResults} />
      </div>
    );
  }
}
