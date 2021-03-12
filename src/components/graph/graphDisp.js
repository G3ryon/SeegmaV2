import React, { Component, useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Icon, ButtonGroup, Button, Layout, Text, Modal, Card, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import RadioButton from '../pratical/radioButton';
import { TokenContext } from '../../styles/themeContext.js';
import {TimeGroup} from '../pratical/timeGroup';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the graph with the data set choosen, there is also the modal for the settings
*/
class Graph_disp extends Component{
  constructor(props){
    super(props);
    this.state = {
        data: [{ label: "Brut", value: "Brut" }, { label: "Hourly", value: "Hour" }, { label: "Daily", value: "Day" }, { label: "Monthly", value: "Month" }],
        value: "Brut",
        visible: false,
        show: false,
        
        date:new Date(),
        mode:'date',
    }
    this.handleSetValue = this.handleSetValue.bind(this);
    this.onChange=this.onChange.bind(this)
 }
 static contextType = TokenContext;
  handleSetValue(value){
    this.setState({value:value})
  }
  onChange = (date) => {
    this.setState({date:date})
  };
  //Method for declaring constant and navigation
  //Icon constant

  backIcon = (props) => (
    <Icon {...props} name='menu-outline' />
  );
  editIcon = (props) => (
      <Icon {...props} name='edit-outline' />
  );
  //function to handle the buttons of the header
  backAction = () => (
      <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.openDrawer()} />
  );
  editAction = () => (
      <TopNavigationAction icon={this.editIcon} onPress={() => this.setState({visible:true})} />
  );
  render(){
  return (
    <View>
      
      <TopNavigation
        title={this.context.siteName}
        accessoryLeft={this.backAction}
        accessoryRight={this.editAction}
      />
      <Text>Site : {this.context.siteName}</Text>
      <RadioButton data={this.state.data} setValue={this.handleSetValue}></RadioButton>
      <TimeGroup onChange={this.onChange} date={this.state.date} index={1} type={this.state.value}></TimeGroup>
      
       
      <Modal visible={this.state.visible}>
        <Card>
          <Text>Advanced options</Text>
          <RadioButton data={this.state.data} setValue={this.handleSetValue}></RadioButton>
          <Button onPress={() => this.setState({visible:false})}>
            Done
          </Button>
        </Card>
      </Modal>

    </View>)}
}
export default Graph_disp

