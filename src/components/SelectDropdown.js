import React from 'react'
var _ = require('lodash');
export class SelectDropdown extends React.Component {
    constructor(props){
      super(props)
      this.setValue = this.setValue.bind(this);
    }
    render(){
      const items = []
      _.each(this.props.map, function(index,value) {
        
        items.push(<option>{index}</option>)
      });
      return (
        <div>
        <label >{this.props.name}</label>
        <select class="form-select" aria-label="Status" onChange={this.setValue}>
          {items}
        </select>
        </div>

      );
    }
    setValue(evt){
      this.props.onChange(evt.target.value)
    }
  }