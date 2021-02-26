import React, { Component} from 'react';
import { Select, SelectItem } from '@ui-kitten/components';

/*
PROPS: data : array of data to be displayed inside the select
       handleSelect : method to change the index of the select
       selectedIndex : value of the actual selected option 
       
RETURN: a select component
*/


class SelectComp extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(event) {
        this.props.handleSelect(event);
        console.log(event)
    }

    renderOption = (title) => (
        <SelectItem title={title} key={title} testID={"selectTestID"} />
    );

    render() {
        const displayValue = this.props.data[this.props.selectedIndex.row];
        return (
            <Select   
                placeholder='SelectValue'
                value={displayValue}
                selectedIndex={this.props.selectedIndex}
                onSelect={index => this.handleSelect(index)}>
                {this.props.data.map(this.renderOption)}
            </Select>
        );
    }
}
export default SelectComp;