
import {Validator} from '../components/Validator';
import { JSON_SCHEMA } from '../config/AlertaConfig';
var _ = require('lodash');
export var JSON_VALIDATOR = Validator(JSON_SCHEMA)
export function generateString(e, state, field="json") {
    var target = e.currentTarget
    var newstate = {
      ...state,
    }
  if (target.value !== ""){
    _.set(newstate,field+ '.' +target.id ,target.value)
  }else{
    _.unset(newstate,field+ '.' +target.id);
  }

    return newstate
}
export function generateInt(e, state, field="json") {
    var target = e.currentTarget
    var newstate = {
      ...state,
    }
  if (target.value !== ""){
    _.set(newstate,field+ '.' +target.id ,parseInt(target.value))
  }else{
    _.unset(newstate,field+ '.' +target.id);
  }
  
    return newstate
  }
  