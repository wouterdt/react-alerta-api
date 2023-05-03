import Ajv from 'ajv';
import _ from 'lodash';
const ajv = new Ajv();
const schema = require("../config/alerta_schema.json")
const validate = ajv.compile(schema)


export function Validator(path){
    var that = {};
 

    that.optionRegexFromJsonSchema = (option) => {
        return _.get(schema,'properties.'+option +".pattern")
    
    }

    that.ExamplesfromJsonSchema= (option) => {
        return  _.get(schema,option +".examples")
        
    }
    that.RequiredfromJsonSchema= (option) => {
     return  _.get(schema,option +"required")
       
    }
    return that;
    

}




export function ExamplesfromJsonSchema(option){
    return  _.get(schema,option +"examples")
}
export function RequiredfromJsonSchema(option){
    let a = _.get(schema,option +"required")
    return a
}
