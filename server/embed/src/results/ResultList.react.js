import React, { Component } from 'react';

export default class ResultList extends Component {
  render(){
    let resultsList = this.props.results.map(function(result, i){
      console.log(result['Organization Name']);
      let resultName = result['Organization Name']
      return <li key={i}>{resultName}</li>
    })
    return(
      <ul>
        {resultsList}
      </ul>
    )
  }
}
