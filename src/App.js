import React from 'react'
import {SEVERITY_MAP,REQUIRED_FIELDS_MAP,} from './config/AlertaConfig';
//https://betterstack.dev/projects/react-tag-input/
import "@pathofdev/react-tag-input/build/index.css";
import './App.css'; // Tell webpack that Button.js uses these styles
import  { APITextField } from './components/APITextField'
import {SelectDropdown} from './components/SelectDropdown'
import { CurlPreview,JsonPreview } from './components/Preview';
import { generateString } from './components/shared';
import {AlertaCreateAlertApp } from './apps/createAlert';
import {SearchAlertByID } from './apps/SearchAlertById';
import {SetAlertStatusApp} from './apps/setAlertStatus'
var _ = require('lodash');
console.log(SEVERITY_MAP)
//Displays the inferace to create an alarm  

class AlertaClientApp extends React.Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      json: {
        resource: "",
        event: "",
        tags: [],
        services: [],
        correlate: []
      },
      meta : {
          url : ""
         
      }
      }
  
  }
  updateGlobal(evt){
    var fields = generateString(evt, this.state, "meta");
    this.setState(fields);    
  }

  render(){

    return ( 
      <div>
     <nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">
      Alerta
    </a>
  </div>
</nav>
        <div style={{borderBottomWidth: '0px', borderBottomStyle: 'solid', marginBottom: '10px'}}  className="container" >

        <div className="row">
      <div className="col"><APITextField name="url" onChange={(evt) =>  this.updateGlobal(evt) } className="is-invalid"  ></APITextField></div>
      <div className="col"><APITextField name="Api-Key" onChange={(evt) => this.updateGlobal(evt)} className="is-invalid"  ></APITextField></div>
    </div>
        </div>


        
      
      <div class="accordion" id="Alertaaccorion">
      <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
      Create Alarm</button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div class="accordion-body">
      <AlertaCreateAlertApp meta={this.state.meta} required = {REQUIRED_FIELDS_MAP}  />
    </div>
    </div>
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
      Change Alarm Status</button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
      <div class="accordion-body">
      <SetAlertStatusApp  meta={this.state.meta}  />
    </div>
    </div>
 
    </div>
    <div class="accordion-item">
      <h2 class="accordion-header" id="panelsStayOpen-headingThree">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
      Get alarm by Id</button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
      <div class="accordion-body">
    </div>

    <SearchAlertByID  meta={this.state.meta}  />
    </div>
 
    </div>
    </div>    
</div>
    
    )
  
}}
export default AlertaClientApp;
