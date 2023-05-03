import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';

export class FormKeyValue extends React.Component  {
    
    constructor(props) {
        super(props);
        


    }
    render(){


       var optional = new Map();
       var optionalkeys =  [];
       var  required =  new Map();
        
        this.props.requiredKeys.forEach(element => {
            required.set(element,"")

        });
        var that = this 
        _.forOwn(this.props.currentSet, function(value,key,object) {
            //distribute incoming keys between the ones required and added by user
            if (_.indexOf(that.props.requiredKeys,key) !== -1){
                required.set(object)

            }else{
                optional.set(object)
                optionalkeys.push(key)
            }
           


          });
        this.state = {'required': required,
                      'optional': optional,
                      'optionalkeys': optionalkeys,
                      'currentSet' : this.props.currentSet
                    }
        
    var that  = this
       return (
        <div>
        <div className="row">
            <div className="col-xs-3 col-md-2">Alarm attributes</div>
        </div>
        <div className="row"><div className="col-xs-3 col-md-2">Key</div><div className="col-xs-3 col-md-2">Value</div></div>
          {
                
                that.props.requiredKeys.map(function(mapkey){
                    return <div><Item required={true} attkey={mapkey} attvalue={that.state.required[mapkey]} valueChange={that.props.stringChange} type='value'></Item></div>
                })

          }
          {
              that.state.optionalkeys.map(function(mapkey){
                return <div ><Item required={false} attkey={mapkey} attvalue={that.state.currentSet[mapkey]} valueChange={that.props.stringChange} keyChange={that.props.keyChange} type='value'></Item></div>


              })
          }


          <div > <Item required={false} attkey='' attvalue='' valueChange={that.props.stringChange} keyChange={that.props.keyChange} type='value'></Item></div>

        </div>


           )
    }
    

}
class Item extends React.Component{
    constructor(props) {
        super(props);
        this.valueChange = this.valueChange.bind(this);
        this.updateOptional = this.updateOptional.bind(this);

    }
    handleKeyChange(old, e){
        debugger
        var target = e.currentTarget
        this.props.keyChange(old,target)

    }
    valueChange(key, e){
            var target = e.currentTarget
            this.props.valueChange(key,target.value)
 
        
    }
    updateOptional(existingkey, newkey,value){
        this.props.keyChange(existingkey,newkey,value)
    
}
    render(){
       {
            if(this.props.required){
               
           return(     <div class='row'>
                <div className='col-xs-3 col-md-2'> {this.props.attkey}</div>
           <div className='col-xs-3 col-md-2'>
           <input
             type="text" id = {this.props.attkey} value={this.props.attvalue}
             onChange={(evt) => this.valueChange(this.props.attkey,evt)}className= {"form-control "}
           />
           </div> </div>)



            } else{
                if (this.props.attkey === ""){ // NEW OPTIONAL FIELD
                    return ( 
                    <div class='row'>
                        <div className='col-xs-3 col-md-2'>   
                            <input type="text" id="newattributekey" className="form-control"/>  
                        </div>
                        <div className='col-xs-3 col-md-2'>
                        <input type="text" id="newattributevalue" className= "form-control"/>
                        </div>   
                        <div className='col-xs-3 col-md-2'>
                            <a><FontAwesomeIcon icon={faPlus} onClick={
                                //skip the replacement of the key in general function
                                (evt) => this.updateOptional(NaN,document.getElementById("newattributekey").value,document.getElementById("newattributevalue").value)} />
                            </a>
                        </div>  
                    </div>
                    )
                }
                else{             // EXISTING OPTIONAL FIELD
                    return (
                            <div class='row'>
                                <div className='col-xs-3 col-md-2'> 
                                    <input
                                    type="text" id ="new" value={this.props.attkey}
                                    className= "form-control"
                                    />   
                                </div>
                                <div className='col-xs-3 col-md-2'>
                            <a><FontAwesomeIcon icon={faPlus} onClick={
                                (evt) => this.updateOptional(this.props.attkey,document.getElementById("newattributekey").value,document.getElementById("newattributevalue").value)} />
                            </a>
                        </div>  
                            </div>
                        )  
                  }

            }


            
                
          
            
          }
    }
}


