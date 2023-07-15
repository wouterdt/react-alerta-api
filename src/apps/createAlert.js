import React from 'react'
import {SEVERITY_MAP,STATUS_MAP,REQUIRED_ATTRIBUTE_MAP} from '../config/AlertaConfig';
import ReactTagInput from "@pathofdev/react-tag-input";
import { CurlPreview,JsonPreview } from '../components/Preview';
import {SelectDropdown} from '../components/SelectDropdown';
import { generateString,generateInt} from '../components/shared';
import  { APITextField } from '../components/APITextField'
import {FormKeyValue} from '../components/FormKeyValue';
import  {RequiredfromJsonSchema} from '../components/Validator.js';

var _ = require('lodash');

export class AlertaCreateAlertApp extends React.Component  {
    constructor(props) {
        super(props);
        
        this.state = {
            json: {
              resource: "",
              event: "",
              tags: [],
              services: [],
              correlate: [],
              status: STATUS_MAP[0],
              severity: SEVERITY_MAP[0],
              attributes : new Map()
            },
            meta : {
                url : 'http://example.com/api'
            },
            statusmap : STATUS_MAP,
            severitymap : SEVERITY_MAP

            }
            //set the required attributes empty
            REQUIRED_ATTRIBUTE_MAP.forEach((key)=> {
              this.state.json.attributes.set(key,"");

            })


        this.generateString = this.generateString.bind(this);
        this.generateList = this.generateList.bind(this);
        this.generateStatus = this.generateStatus.bind(this);
        this.replaceAttributeValue = this.replaceAttributeValue.bind(this);
        this.replaceAttributeKey = this.replaceAttributeKey.bind(this);
        this.curltemplate =`curl -XPOST {{{props.meta.url}}}/alert
        -H 'X-API-Key:{{{props.meta.Api-Key}}}'
        -H 'Content-type: application/json'  -d '{{{prettyjson}}}'  
        `
        this.pythontemplate = `
        from alertaclient.api import Client
        client = Client(key='{{props.meta.Api-Key}}') 
        client.send_alert(resource='{{props.json.resource}}',
                          event='{{props.json.event}}',
                          {{#props.json.environment}}environment={{props.json.environment}},{{/props.json.environment}}
                          {{#props.json.severity}}severity={{props.json.severity}},{{/props.json.severity}}
                          {{#props.json.status}}status={{props.json.status}},{{/props.json.status}}
                          {{#props.json.correlate}}correlate={{props.json.correlate}},{{/props.json.correlate}}
                          {{#props.json.services}}services={{props.json.services}},{{/props.json.services}}
                          {{#props.json.group}}group={{props.json.group}},{{/props.json.group}}
                          {{#props.json.value}}value={{props.json.value}},{{/props.json.value}}
                          {{#props.json.text}}text={{props.json.text}},{{/props.json.text}}
                            )`
    }
    renderReady(state){
      let status = ""
     
      if (!state.json.event){
        status += "an alert requires an event "
      }
      if (!state.json.resource){
        status+= " An alert requires a resource"
      }
      if (status !== ""){
        status = (<div>{status}</div>)
    
      }
      return status
    }


    generateList(e,element,group="json") {
      var newstate = {
        ...this.state,
      }
    _.set(newstate,group+ '.' +element ,e)
      this.setState(newstate);
    }
   
    removeSet(e,field){
      var target = e.currentTarget
      var newstate = {
        ...this.state,
      }
    _.unset(newstate,field+ '.' +target.id ,target.value)
    this.setState(newstate);
  

    }

    generateString(e, field="json") {
      var fields = generateString(e, this.state, field);
      this.setState(fields);    
    }generateInt(e, field="json") {
      var fields = generateInt(e, this.state, field);
      this.setState(fields);    
    } 
    generateStatus(status){
      let newstate = {

        ...this.state
      }
      newstate['json']['status']= status
      this.setState(newstate)
    }

    generateFromList(status,field="json",element="status"){
      let newstate = {
    
        ...this.state
      }
      newstate[field][element]= status
      this.setState(newstate)
    }

    replaceAttributeValue( key, newvalue) {
      var newstate = {
        ...this.state,
      }
    newstate.json.attributes.set(key,newvalue);
    _.set(newstate,"json.attributes." + key,newvalue)
    this.setState(newstate);
    //move map attributes as object cause if not parser fails
  // should use lodash by default but too lazy to refactor
    }

    replaceAttributeKey(oldpath ,newpath, newvalue){
      var newstate = {
        ...this.state
      } 
        //move map attributes as object cause if not parser fails
  // should use lodash by default but too lazy to refactor
      _.unset(newstate,"json.attributes." + oldpath)
      _.set(newstate,"json.attributes." + newpath,newvalue)
      newstate.json.attributes.delete(oldpath)
      newstate.json.attributes.set(newpath,newvalue)
      this.setState(newstate)
    }
    RemoveOptionalAttribute(key){
      var newstate = {
        ...this.state
      } 
      _.unset(newstate,"json.attributes." + key)
      newstate.json.attributes.delete(key)
      this.setState(newstate)
    }


    render(){
    this.state.meta.url = this.props.meta.url;
    this.state.meta['Api-Key'] = this.props.meta['Api-Key'];
    var that = this;
    
    let requires  = RequiredfromJsonSchema("")
    
   return (
    <div className="CreateAlarm container">
      <p>Creates an alarm in the desired state in Alerta, the returned lastReceiveId must be used for furter state manipulation</p>
      <a href="https://docs.alerta.io/api/reference.html#create-an-alert" target="_blank" rel="noreferrer" >API</a>

    <div className="container">
 
      <div className="row">
        <div className="col-xs-6 col-md-4"><APITextField name="resource" onChange={this.generateString} className="is-invalid" requires={requires}/></div>
        <div className="col-xs-6 col-md-4"><APITextField name="event" onChange={this.generateString} className="is-invalid" requires={requires} ></APITextField></div>
        <div className="col-xs-6 col-md-4"><APITextField name="environment" onChange={this.generateString} requires={requires} ></APITextField></div>
      </div>
    
      <div className="row">
        <div className="col-xs-3 col-md-2"><SelectDropdown map={this.state.statusmap} name="status" onChange={(evt) => this.generateFromList(evt,"json","status")}></SelectDropdown></div>
        <div className="col-xs-3 col-md-2"><SelectDropdown map={this.state.severitymap} name="severity" onChange={(evt) => this.generateFromList(evt,"json","severity")}></SelectDropdown></div>
        <div className="col-xs-6 col-md-4"><label >correlate</label><ReactTagInput  tags={this.state.json.correlate} onChange={(evt) => this.generateList(evt,"correlate")} /></div>
        <div className="col-xs-6 col-md-4"><label >services</label><ReactTagInput  tags={this.state.json.services} onChange={(evt) => this.generateList(evt,"services")} /></div>
      </div>
    
      <div className="row">
        <div className="col-xs-3 col-md-2"><APITextField name="group" onChange={this.generateString} requires={requires}  ></APITextField></div>
        <div className="col-xs-3 col-md-2"><APITextField name="value" onChange={this.generateString} requires={requires} ></APITextField></div>
        <div className="col-xs-6 col-md-4"><APITextField name="text" onChange={this.generateString} requires={requires} ></APITextField></div>
        <div className="col-xs-6 col-md-4"><label >tags</label><ReactTagInput  tags={this.state.json.tags} onChange={(evt) => this.generateList(evt,"tags")} /></div>

      </div>
    
      <div className="row">
        <div className="col-xs-3 col-md-2"><APITextField name="timeout" onChange={(evt) =>  this.generateInt(evt,"json")} requires={requires}  ></APITextField></div>
        <div className="col-xs-3 col-md-2"><APITextField name="Origin" onChange={(evt) => this.generateString(evt,"meta")} requires={requires}  ></APITextField></div>
        <div className="col-xs-3 col-md-2"><APITextField name="Type" onChange={(evt) => this.generateString(evt,"meta")} requires={requires} ></APITextField></div>
      </div>     
    
      

      <p>attributes</p>
      <FormKeyValue valueChange={(path,value) => this.replaceAttributeValue(path ,value)} 
      stringRemove={that.removeSet} 
      changeOptionalAttribute={
           (oldpath,newpath, value) => 
              this.replaceAttributeKey(oldpath,newpath,value)
      }
      removeOptionalAttribute={(key) => this.RemoveOptionalAttribute(key)}
      requiredKeys={REQUIRED_ATTRIBUTE_MAP} currentSet={this.state.json.attributes}/>
 
      </div> 
 
      <p></p>
      <div>
    
   
 
    </div>
    <div class="container">
    <h2>JSON for query call</h2>
    <JsonPreview json={this.state.json} />
    <h2>CURL for query call</h2>
    <CurlPreview meta={this.state.meta}   json={this.state.json} template={this.curltemplate} path="/alert"  />

    </div>
    </div>
      );

}}
