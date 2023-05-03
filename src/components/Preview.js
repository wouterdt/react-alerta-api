import React from 'react'
import Mustache from 'mustache';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
var _ = require('lodash');

//custom cause lodash _isempty does not remove empty object
function isEmpty (value) {
  const type = typeof value;
  if ((value !== null && type === 'object') || type === 'function') {
    const props = Object.keys(value);
     if (props.length === 0 || props.size === 0) { 
       return true;
     } 
   } 
   return !value;
}
function cleanJson(json){
  var cleanjson = _(json).omitBy(isEmpty)
  //move map attributes as object cause if not parser fails
  // should use lodash by default but too lazy to refactor
return cleanjson
}


export class JsonPreview extends React.Component{
    render(){
        var cleanjson = cleanJson(this.props['json']);
        return JSON.stringify(cleanjson)
    }
  }
  export class CurlPreview extends React.Component{
    render(){
      
      var cleanjson = cleanJson(this.props['json']);

      this.prettyjson = JSON.stringify(cleanjson)
        return Mustache.render(this.props.template, this);
     }
  }

  

 export class PythonPreview extends React.Component{
 
    render(){
      this.prettyjson  = _(this.props['json']).omitBy(_.isEmpty).omitBy(_.isNull)

        const text = String(Mustache.render(this.props.template, this)).replace(/(^[ \t]*\n)/gm, "");
          return (
          <SyntaxHighlighter language="javascript" style={dark}>
            {text}
          </SyntaxHighlighter>
        );

  }}