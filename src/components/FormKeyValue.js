import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faRefresh, faRemove } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash';

export class FormKeyValue extends React.Component  {
    //PROPS
    //ARRAY requiredKeys ==> keys that must be specified and cannot have their key changed by user 
    // MAP currentSet ==> keys and values that are set

    updateRequiredAttribute(key,newValue){
        this.props.valueChange(key,newValue)

    }
    updateOptionalAttribute(existingKey, newKey,newValue){
        this.props.changeOptionalAttribute(existingKey,newKey,newValue)
    }
    removeOptionalAttribute(key){
        this.props.removeOptionalAttribute(key)

    }
    
    constructor(props) {
        super(props);
        this.updateOptionalAttribute = this.updateOptionalAttribute.bind(this);
        this.updateRequiredAttribute = this.updateRequiredAttribute.bind(this);
        this.removeOptionalAttribute = this.removeOptionalAttribute.bind(this);

    }


    render(){
        let renderresult = [];
        this.state = {
        'requiredKeys': this.props.requiredKeys,
        'requiredMap':  new Map(),
        'requiredValues':[],
        'optionalKeys': [],
        'optionalValues': [],
        'optionalMap':  new Map(),
      
      }
        let that = this

        this.props.currentSet.forEach((value,key,map) =>{
            //distribute incoming keys between the ones required and added by user
            if (_.indexOf(that.props.requiredKeys,key) !== -1){
                that.state.requiredValues.push(value)
                that.state.requiredMap.set(key,value)

            }else{
                that.state.optionalValues.push(value)
                that.state.optionalKeys.push(key)
                that.state.optionalMap.set(key,value)
            }
            
          });
        //add an Item for each required attribute
       
        this.state.requiredKeys.map(function(mapkey){
            renderresult.push((<div><Item required={true} key={mapkey} attkey={mapkey} attvalue={that.state.requiredMap.get(mapkey)} valueChange={that.updateRequiredAttribute} type='value'></Item></div>)
            )
        });
        var optionalcounter = this.state.optionalKeys.length
        //append an optional field
        this.state.optionalKeys.map(function(mapkey){
      
            renderresult.push(<div><Item required={false} key={"optionalAttribute_" +mapkey} attkey={mapkey} attvalue={that.state.optionalMap.get(mapkey)} keyChange={that.updateOptionalAttribute} keyRemove={that.removeOptionalAttribute} type='value'></Item></div>);

        });
            //extra for new optional value
            renderresult.push((<div><Item required={false} key={"optionalAttribute_" +optionalcounter} attkey={""} attvalue={""} keyChange={this.updateOptionalAttribute}  type='value'></Item></div>));
        return renderresult
    }
    

}


class Item extends React.Component{
    constructor(props) {
        super(props);
        this.valueChange = this.valueChange.bind(this);
        this.updateOptional = this.updateOptional.bind(this);
        this.removeOptional = this.removeOptional.bind(this);

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
    
    }removeOptional(key){
        this.props.keyRemove(key);
    }
    render(){
       {
            if(this.props.required){
               
           return(<div class='row'>
                <div className='col-xs-3 col-md-2'> {this.props.attkey}</div>
           <div className='col-xs-3 col-md-2'>
           <input
             type="text" id = {this.props.attkey} value={this.props.attvalue}
             onChange={(evt) => this.valueChange(this.props.attkey,evt)} className={"form-control"}
           />
           </div> </div>)



            }
            else{
                if (this.props.attkey === ""){ // NEW OPTIONAL FIELD
                    return ( 
                    <div class='row'>
                        <div className='col-xs-3 col-md-2'>   
                            <input type="text" id="newattributekey" key="newattributekey" className="form-control"/>  
                        </div>
                        <div className='col-xs-3 col-md-2'>
                        <input type="text" id="newattributevalue" key="newattributevalue" className= "form-control"/>
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
                else{          // EXISTING OPTIONAL FIELD
                    return (
                            <div class='row'>
                                <div className='col-xs-3 col-md-2'> 
                                    <input
                                    type="text" id ={"att_" + this.props.attkey} defaultValue={this.props.attkey}
                                    key={"optionalKey_" +this.props.optionalcounter}
                                    className= "form-control"
                                   />   
                                </div>
                                <div className='col-xs-3 col-md-2'>
                                     <input
                                    type="text" id ={"val_" + this.props.attkey} defaultValue={this.props.attvalue}
                                    key={"optionalValue_" +this.props.optionalcounter}
                                    className= "form-control"
                                     
                                    />


                        </div>  
                        <div className='col-xs-3 col-md-2'>
                            <p><FontAwesomeIcon icon={faRefresh} className="refreshclick"  onClick={
                                //skip the replacement of the key in general function
                                (evt) => this.updateOptional( this.props.attkey ,document.getElementById("att_" + this.props.attkey).value,document.getElementById("val_" + this.props.attkey).value)} />
                               
                            <FontAwesomeIcon icon={faRemove} className="deleteclick"  onClick={
                                //skip the replacement of the key in general function
                                (evt) => this.removeOptional(document.getElementById("att_" + this.props.attkey).value)} />
                        </p>    
                        </div>  
                    
                    </div>
                        )  
                  }

            }


            
                
          
            
          }
    }
}


