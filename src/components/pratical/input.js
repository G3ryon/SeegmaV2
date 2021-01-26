import React, { Component, Fragment, } from 'react';
import { Input } from '@ui-kitten/components';



/*
PROPS: onChange : function to change the value of the input
       type : type of input text or password
       value : the display value of the input
       placeHolder : Value seen if there is no value in the input
       required : true or false
       readonly : true or false
       status : success,danger,..
       caption : string display under the input
       
RETURN: a  modified input
*/


class TxtInput extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onChange(event)
    }

    

    render() {
        
        return (
            
            <Input
                readOnly={this.props.readonly}
                value={this.props.value}
                onChangeText={text => this.handleChange(text)}
                required={this.props.required}
                placeholder={this.props.placeHolder}
                size={this.props.size}
                caption={this.props.caption}
                status={this.props.status}
                secureTextEntry={this.props.type === 'password'}
                placeholder={this.props.placeHolder}
                 />
                
            
        );
    }
}
export default TxtInput;