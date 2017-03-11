// Expect an object of filters, each containing an array of options.
// On select, updates active filters
import React, { Component } from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';


export default class ResultFilters extends Component {
  constructor(){
    super();
  }

  render(){
    let filters;
    if(this.props.loaded){
      let filterList = this.props.filterOptions;
      filters = filterList.map(function(filter, i){
          return (
            <option value={filter} key={i}>{filter}</option>
          )
      })
    }
    return(
      <div className="result-filters">
          <FormGroup controlId="formControlsSelect">
            <FormControl onChange={this.props.setFilters} componentClass="select" placeholder="select">
              <option value="" selected>All Categories</option>
              {filters}
            </FormControl>
          </FormGroup>
      </div>
    )
  }
}
