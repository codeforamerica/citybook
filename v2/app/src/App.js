import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import TopNav from './navigation/topNav.react.js';
import ErrorBar from './ErrorBar.react.js';
import getSpreadsheetData from './scripts/getSpreadsheetData.js';
import ResultListWrapper from './results/ResultListWrapper.react.js';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      initialLoadComplete: false,
      errors: '',
      filterOptions: '',
      results:'',
      spreadsheetId: ''
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.updateState = this.updateState.bind(this);
  }
  updateState(loadState, filterOptions, results, error){
    this.setState({
      initialLoadComplete: loadState,
      filterOptions: filterOptions,
      results: results,
      errors: error
    })
  }
  componentWillMount(){
    console.log(this.props.params.bookId)
    this.setState({
      spreadsheetId: this.props.params.bookId
    });
  }
  componentDidMount(){
    getSpreadsheetData(this.state.spreadsheetId, this.updateState);
  }
  render() {
    let errors;
    if(this.state.errors){
      errors = <h1>There was an error</h1>
    }
    return (
      <div>
        <TopNav loaded={this.state.initialLoadComplete} spreadsheetId={this.props.params.bookId} filterOptions={this.state.filterOptions} results={this.state.results} />
        <ErrorBar errors={this.state.errors} />
        <ResultListWrapper loaded={this.state.initialLoadComplete} errors={this.state.errors} results={this.state.results} />
      </div>
    );
  }
}
