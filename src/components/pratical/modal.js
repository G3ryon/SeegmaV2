import React, { Component, Fragment, } from 'react';
import { Button, Layout, Modal, Card, Text } from '@ui-kitten/components';



/*
PROPS: visible : boolean corresponding to the visibility of the modal
       admitBackdrop : boolean to be able to activate the backdrop
       admitButton : boolean to be able to activate the button
       onVisibility : function to change the visible state
       infos :  component or text to display in the modal
       exitText : string to be displayed into the button
       
RETURN: a  modal
*/


class ModalCard extends Component {
    constructor(props) {
        super(props);
        this.handleVisibility = this.handleVisibility.bind(this);
    }

    handleVisibility(event) {
        this.props.onVisibility(event)
    }

    render() {
        return (
            <Modal visible={this.props.visible}  onBackdropPress={() => this.props.admitBackdrop && this.handleVisibility(false) }>
            <Card>
            {this.props.infos}
            {this.props.admitButton && <Button onPress={() => this.handleVisibility(false)} >{this.props.exitText}</Button>} 
            </Card>
            </Modal>
        );
    }
}
export default ModalCard;