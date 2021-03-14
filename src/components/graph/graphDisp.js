import React, { Component} from 'react';
import { View} from 'react-native';
import { IndexPath,Icon, Text, Modal, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import RadioButton from '../pratical/radioButton';
import { TokenContext } from '../general/context';
import { TimeGroup } from '../pratical/timeGroup';
import Settings from './settings.js';
import SelectComp from '../pratical/select';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the graph with the data set choosen, there is also the modal for the settings
*/
class Graph_disp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: new IndexPath(0),
      dataSelect: ["Test1", "Test2", "Test3"],
      data: [{ label: "Brut", value: "Brut" }, { label: "Hourly", value: "Hour" }, { label: "Daily", value: "Day" }, { label: "Monthly", value: "Month" }],
      value: "Brut",
      visible: false,
      show: false,

      date: new Date(),
    }
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSetValue = this.handleSetValue.bind(this);
    this.applyChange = this.applyChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  static contextType = TokenContext;
  handleSetValue(value) {
    this.setState({ value: value })
  }
  onChange(date) {

    this.setState({ date: date })
  };
  handleSelect(event) {
    this.setState({ selectedIndex: event })
  }

  applyChange(type, start, end) {
    //recup data and slice to be in the range
    if (type == 'cancel') {
      this.setState({ visible: false })
    } else {
      console.log(type)
      console.log(start)
      console.log(end)
      this.setState({ visible: false })
    }

    //change time group by custom
  }
  //Method for declaring constant and navigation
  //Icon constant

  backIcon = (props) => (
    <Icon {...props} name='arrow-back-outline' />
  );
  editIcon = (props) => (
    <Icon {...props} name='edit-outline' />
  );
  //function to handle the buttons of the header
  backAction = () => (
    <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
  );
  editAction = () => (
    <TopNavigationAction icon={this.editIcon} onPress={() => this.setState({ visible: true })} />
  );
  render() {
    return (
      <View>

        <TopNavigation
          title={this.props.route.params["graphId"] == 0 ? (<View><Text>Flux : </Text><SelectComp selectedIndex={this.state.selectedIndex} data={this.state.dataSelect} handleSelect={this.handleSelect} /></View>) : ("Graph")}
          accessoryLeft={this.backAction}
          accessoryRight={this.editAction}
        />
        <Text>Site : {this.context.siteName}</Text>
        <RadioButton data={this.state.data} setValue={this.handleSetValue}></RadioButton>
        <TimeGroup onChange={this.onChange} date={this.state.date} type={this.state.value}></TimeGroup>


        <Modal visible={this.state.visible}>
          <Settings apply={this.applyChange}></Settings>
        </Modal>

      </View>)
  }
}
export default Graph_disp

