import { generateString } from '../components/shared';
import  { APITextField } from '../components/APITextField'
import { CurlPreview } from '../components/Preview';

import React from 'react'
export class SearchAlertByID extends React.Component{

    constructor(props){
      super()
      this.state = {
        json: {},
        meta : {
            url : "",
            id : ""
           
        }
        }
        this.curltemplate =`curl -XGET {{{props.meta.url}}}/alerts?id={{{props.meta.id}}}
        -H 'X-API-Key:{{{props.meta.Api-Key}}}' 
        `
        this.generateString = this.generateString.bind(this);
      
    }

    generateString(e, field="json") {
        var fields = generateString(e, this.state, "meta");
        this.setState(fields);    
      }
    
    render(){
      this.state.meta.url = this.props.meta.url;
      this.state.meta['Api-Key'] = this.props.meta['Api-Key'];
    return(
      <div className="container">
     <p> Retrieve the content from an alert using the alert id <br/>
      <a href="https://docs.alerta.io/api/reference.html#set-alert-status" target="_blank" rel="noreferrer" >API</a>   
      <a href="https://docs.alerta.io/api/query-syntax.html#api-query" target="_blank" rel="noreferrer" >query syntax</a> </p>
        <form >
          <div className="row">
          <div className="col-3"><APITextField name="id" onChange={(evt) =>  this.generateString(evt,this.state.meta,"id")} requires={true}></APITextField></div>
        </div>
        </form>

        <div className="row">
        <h2>JSON for query call</h2>
          No Json body for this request
          <h2>CURL for query call</h2>
          <CurlPreview meta={this.state.meta}  json={this.state.json} path="/alerts" template={this.curltemplate} />
      
        </div>
        </div>
      
      
      );
      }
    
    }
  