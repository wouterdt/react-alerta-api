import React from 'react'

var _ = require('lodash');
export class APITextField extends React.Component{

    render(){
      let found = _.indexOf(this.props.requires , this.props.name )
      if (found != -1 || this.props.requires === true ) {

        return <div><label >{this.props.name}</label><input id={this.props.name}  type="text" className="form-control is-invalid" onChange={this.props.onChange}></input></div>
      }else{

        return <div><label >{this.props.name}</label><input id={this.props.name}  type="text" className= "form-control "  onChange={this.props.onChange}></input></div>
      }

     
    }
  }