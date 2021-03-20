import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import { IndexPath, Icon, Text, Modal, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import RadioButton from '../pratical/radioButton';
import { TokenContext } from '../general/context';
import { TimeGroup } from '../pratical/timeGroup';
import Settings from './settings.js';
import SelectComp from '../pratical/select';
import Chart from '../pratical/charts'
import { gettingGraphInfo, gettingGraphData } from '../../api/api.js';
import Loading from '../general/loading'
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the graph with the data set choosen, there is also the modal for the settings
*/
var data = [
  [
    "1/4/2011",
    "bastien",
    122
  ],
  [
    "1/4/2011",
    "michel",
    12
  ],
  [
    "1/5/2011",
    "bastien",
    1200
  ],
  [
    "1/5/2011",
    "michel",
    550
  ],
  [
    "1/6/2011",
    "bastien",
    1
  ],
  [
    "1/6/2011",
    "michel",
    0
  ],
  [
    "1/7/2011",
    "bastien",
    4000
  ],
  [
    "1/7/2011",
    "michel",
    2500
  ],
]

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
      loading: true,
      loading1: true,
      date: new Date(),
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSetValue = this.handleSetValue.bind(this);
    this.applyChange = this.applyChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  static contextType = TokenContext;

  async componentDidMount() {
    await gettingGraphInfo(this.context.token, this.props.route.params["graphId"])
      .then(response => {
        if (response["success"] === 0) {

        }
        else {
          let data = response["data"]
          this.setState({ title: data['title'], yTitle: data['yTitle'], unit: data['unit'], graphType: "column", loading: false })
        }
      })
      .catch(error=>console.log(error))
    await gettingGraphData(this.context.token, this.props.route.params["graphId"], this.state.value, this.state.date, this.state.date, )
      .then(response => {
        if (response["success"] === 0) {

        }
        else {
          let data = response["data"]
          console.log(data)
          this.setState({ title: data['title'], yTitle: data['yTitle'], unit: data['unit'], graphType: "column",loading1: false })
        }
      })
      

  }

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
    this.formats = [{
      "name": "Time",
      "type": "date",
      "format": "%-m/%-d/%Y"
    }, {
      "name": "Type",
      "type": "string"
    }, {
      "name": "Consumption",
      "type": "number"
    }
    ]

    if (this.state.loading && this.state.loading1) {
      return (
        <View>
          <Loading />
        </View>
      )
    }
    else {
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
          <Chart graphType={this.state.graphType} timeType={this.state.value} title={this.state.title} unit={this.state.unit} yTitle={this.state.yTitle} data={data} format={this.formats} ></Chart>
          <Modal visible={this.state.visible}>
            <Settings apply={this.applyChange}></Settings>
          </Modal>

        </View>)
    }
  }
}
export default Graph_disp

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

  chartContainer: {
    height: 500,
    width: Dimensions.get('window').width,
    borderColor: "#000",
    borderWidth: 1
  }
});
