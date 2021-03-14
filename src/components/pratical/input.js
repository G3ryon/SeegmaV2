import React, { Component } from 'react';
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

    handleValidation(value) {
        const { pattern } = this.props;
        if (!pattern) return true;
    
        // string pattern, one validation rule
        if (typeof pattern === 'string') {
          const condition = new RegExp(pattern, 'g');
          return condition.test(value);
        }
    
        // array patterns, multiple validation rules
        if (typeof pattern === 'object') {
          const conditions = pattern.map(rule => new RegExp(rule, 'g'));
          return conditions.map(condition => condition.test(value));
        }
      }

      onChange(value) {
        const { onChangeText, onValidation } = this.props;
        const isValid = this.handleValidation(value);
    
        onValidation && onValidation(isValid);
        onChangeText && onChangeText(value);
      }
    

    render() {
        const {
            pattern,
            onChangeText,
            children,
            ...props
        } =this.props;
        
        return (
            
            <Input
                onChangeText={value => {this.onChange(value); this.handleChange(value)}}
                secureTextEntry={this.props.type === 'password'}
                {...props}
                >
                {children} 
            </Input>
                
            
        );
    }
}
export default TxtInput;