import React from 'react'
import {SEVERITY_MAP,STATUS_MAP,CHANGE_ALARMSTATUS_STATUS_MAP} from '../config/AlertaConfig';
import { CurlPreview,JsonPreview } from '../components/Preview';
import {SelectDropdown} from '../components/SelectDropdown';
import { generateString,generateInt } from '../components/shared';
import  { APITextField } from '../components/APITextField'
export class SetAlertStatusApp extends React.Component{

  
    constructor(props) {
      super(props);
      this.state = {
          json: {
            resource: "",
            event: "",
            tags: [],
            services: [],
            correlate: [],
            status : STATUS_MAP[0],
            severity: SEVERITY_MAP[0]
          },
          meta : {
              url : this.props.meta.url,
             
          },
          statusmap : CHANGE_ALARMSTATUS_STATUS_MAP,
          severitymap : SEVERITY_MAP
  
          
          }
      this.pythontemplate = `
          from alertaclient.api import Client
          client = Client(key='{{props.meta.Api-Key}}') 
          client.send_alert(resource='{{props.json.resource}}',`
      this.generateString = this.generateString.bind(this);
      this.curltemplate =`curl -XPUT {{{props.meta.url}}}/alert/{{{props.meta.id}}}/status
          -H 'X-API-Key:{{{props.meta.Api-Key}}}'
          -H 'Content-type: application/json'  -d '{{{prettyjson}}}'  
          `
  }
  generateString(e, field="json") {
    var fields = generateString(e, this.state, field);
    this.setState(fields);    
  }
    generateInt(e, field="json") {
    var fields = generateInt(e, this.state, field);
    this.setState(fields);    
  } 
  generateFromList(status,field="json",element="status"){
    let newstate = {
  
      ...this.state
    }
    newstate[field][element]= status
    this.setState(newstate)
  }
     render(){
      this.state.meta.url = this.props.meta.url;
      this.state.meta['Api-Key'] = this.props.meta['Api-Key'];
      return (
      <div className="SetAlarmStatus container">
      <p>changes the state of an alert with the id that was recieved when creating it (lastReceiveId), timeouts on state change are calculated
      from the lastReceiveTime timestamp
      </p>


      <a href="https://docs.alerta.io/api/reference.html#set-alert-status" target="_blank" rel="noreferrer" >API</a>
      <div className="container">
        <form>
          <div className="row">
          <div className="col-3"><APITextField name="id" onChange={(evt) =>  this.generateString(evt,"meta")}  requires={true} ></APITextField></div>
          <div className="col-3"><SelectDropdown map={this.state.statusmap} name="severity" onChange={(evt) => this.generateFromList(evt,"json","status")}></SelectDropdown></div>
          <div className="col-3"><APITextField name="text" onChange={(evt) =>  this.generateString(evt,"json")}  requires={true}  ></APITextField></div>
          <div className="col-3"><APITextField name="timeout" onChange={(evt) =>  this.generateInt(evt,"json")} requires={true}   ></APITextField></div>
        </div>
        </form>
        <div className="row">
        <h2>JSON for query call</h2>
          <JsonPreview json={this.state.json} />
          <h2>CURL for query call</h2>
          <CurlPreview meta={this.state.meta}   json={this.state.json} path="/alert" template={this.curltemplate} />
      
        </div>
      </div> 
      </div>
      );
  
    }
  
  
  }
  