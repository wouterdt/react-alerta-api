import { Validator } from "../components/Validator"
export const JSON_VALIDATOR = Validator()

//PATH to the json schema that should  be checked
export const JSON_SCHEMA = "../config/alerta_schema.json"


//CREATE ALARM EXAMPLE
//const  SEVERITY_MAP =["Disaster", "fatal", "High", "critical" , "Average" , "major" , "Warning" , "minor" , "Information" , "warning" , "OK" , "indeterminate" , "ok" , "normal" , "informational" , "Not classified" , "unknown" , "trace" , "error"]
export const SEVERITY_MAP = JSON_VALIDATOR.ExamplesfromJsonSchema("properties.severity")
export const STATUS_MAP = JSON_VALIDATOR.ExamplesfromJsonSchema("properties.status")
export const REQUIRED_ATTRIBUTE_MAP = []
export const REQUIRED_FIELDS_MAP = JSON_VALIDATOR.RequiredfromJsonSchema("") //["environment","severity","status","event","group","timeout"]


//CAHNGE ALARM STATUS ALARM EXAMPLE

export const CHANGE_ALARMSTATUS_STATUS_MAP= ["shelved","closed"]

export default {
    SEVERITY_MAP: JSON_VALIDATOR.ExamplesfromJsonSchema("severity"),
    STATUS_MAP: JSON_VALIDATOR.ExamplesfromJsonSchema("status"),
    REQUIRED_FIELDS_MAP: JSON_VALIDATOR.RequiredfromJsonSchema(""),
    REQUIRED_ATTRIBUTE_MAP :  ["alarm CI_lookup type", "alarm CI_lookup value1"],
    REQUIRED_FIELDS_MAP : JSON_VALIDATOR.RequiredfromJsonSchema("")
    }