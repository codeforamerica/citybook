import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'
import TopNav from './navigation/topNav.react.js';
import getSpreadsheetData from './scripts/getSpreadsheetData.js';
import ResultList from './results/ResultList.react.js';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      initialLoadComplete: false,
      filterOptions: '',
      results:'',
      spreadsheetId: ''
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.updateState = this.updateState.bind(this);
  }
  updateState(loadState, filterOptions, results){
    this.setState({
      initialLoadComplete: loadState,
      filterOptions: filterOptions,
      results: results
    })
  }
  componentWillMount(){
    this.setState({
      spreadsheetId: this.props.params.bookId
    });
  }
  componentDidMount(){
    getSpreadsheetData(this.state.spreadsheetId, this.updateState);
  }
  render() {
    let app;
    if(this.state.initialLoadComplete){
      app = (
        <div>
        <TopNav filterOptions={this.state.filterOptions} />
        <ResultList results={this.state.results} />
        </div>
      )
    } else {
      app = <h1>Loading</h1>
    }
    return (
      <div>
        {app}
      </div>
    );
  }
}
