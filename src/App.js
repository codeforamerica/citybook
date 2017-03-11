import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import TopNav from './navigation/topNav.react.js';
import ErrorBar from './ErrorBar.react.js';
import getSpreadsheetData from './scripts/getSpreadsheetData.js';
import ResultListWrapper from './results/ResultListWrapper.react.js';
import fuzzy from 'fuzzy';
import Sidebar from 'react-sidebar';
import SidebarContent from './navigation/SidebarContent.react.js';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      initialLoadComplete: false,
      sidebarOpen: false,
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
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
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
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/books/' + this.props.params.bookId);
    xhr.onload = (function(data){
      if (xhr.status === 200){
        let
          parsed = JSON.parse(data.srcElement.response),
          spreadsheetLink = parsed.google_spreadsheet_link;
        getSpreadsheetData(spreadsheetLink, this.updateState);
        this.setState({
          spreadsheetId: spreadsheetLink
        });
      } else {
        console.error('Could not fetch spreadsheet');
      }
    }).bind(this);
    xhr.send();
  }

  componentDidUpdate(){
    if(this.state.sheetName){
      localStorage.setItem(this.state.sheetName, this.props.params.bookId);
    }
  }

  onSetSidebarOpen(){
    console.log('opening');
    this.setState({sidebarOpen: !this.state.sidebarOpen});
  }

  render() {
    let errors;
    if(this.state.errors){
      errors = <h1>There was an error</h1>
    }

    let styles = {
      root: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
      },
      sidebar: {
        zIndex: 2000,
        position: 'absolute',
        top: 0,
        bottom: 0,
        transition: 'transform .3s ease-out',
        WebkitTransition: '-webkit-transform .3s ease-out',
        willChange: 'transform',
        overflowY: 'auto',
        backgroundColor: 'white'
      },
      content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
        transition: 'left .3s ease-out, right .3s ease-out',
      },
      overlay: {
        zIndex: 1500,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: 'hidden',
        transition: 'opacity .3s ease-out',
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      dragHandle: {
        zIndex: 1,
        position: 'fixed',
        top: 0,
        bottom: 0,
      },
    }

    return (
      <Sidebar
              sidebar={<SidebarContent spreadsheetId={this.state.spreadsheetId} sidebarToggle={this.onSetSidebarOpen} />}
              open={this.state.sidebarOpen}
              onSetOpen={this.onSetSidebarOpen}
              pullRight={true}
              styles={styles}>
        <TopNav
          loaded={this.state.initialLoadComplete}
          spreadsheetId={this.state.spreadsheetId}
          results={this.state.filteredResults}
          setSearchInput={this.setSearchInput}
          sidebarToggle={this.onSetSidebarOpen}/>

        <ErrorBar errors={this.state.errors} />

        <ResultListWrapper
          loaded={this.state.initialLoadComplete}
          errors={this.state.errors}
          filterOptions={this.state.filterOptions}
          setFilters={this.setFilters}
          results={this.state.filteredResults} />
      </Sidebar>
    );
  }
}
