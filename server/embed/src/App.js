import React, { Component } from 'react';
import TopNav from './navigation/topNav.react.js';
import getSpreadsheetData from './scripts/getSpreadsheetData.js';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      initialLoadComplete: false,
      filterOptions: ''
    }
    this.componentWillMount = this.componentWillMount.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  updateState(loadState, filterOptions){
    this.setState({
      initialLoadComplete: loadState,
      filterOptions: filterOptions
    })
  }
  componentWillMount(){
    getSpreadsheetData('1jaxOSJPy6sg_BTDdo6pKTmPhDeae97TICxTDGblD3hw', this.updateState);
  }
  render() {
    let app;
    if(this.state.initialLoadComplete){
      app = <TopNav filterOptions={this.state.filterOptions} />
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
