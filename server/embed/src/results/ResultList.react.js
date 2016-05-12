import React, { Component } from 'react';

export default class ResultList extends Component {
  render(){
    let resultsList = this.props.results;

    resultsList.sort(function(a, b){
      if(a['Organization Name'] < b['Organization Name']) return - 1;
      if(a['Organization Name'] > b['Organization Name']) return 1;
      return 0;
    });

    var list = resultsList.map(function(result, i){
      console.log(result['Organization Name']);
      let resultName = result['Organization Name']
      return <li key={i}>{resultName}</li>
    })
    return(
      <div>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}
