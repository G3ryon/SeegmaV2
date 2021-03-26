import React, { Component } from 'react';
import { StyleSheet, View, Platform, Dimensions, ScrollView } from 'react-native';
import { IndexPath, Icon, Text, Modal, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import RadioButton from '../pratical/radioButton';
import { TokenContext } from '../general/context';
import { TimeGroup } from '../pratical/timeGroup';
import Settings from './settings.js';
import SelectComp from '../pratical/select';
import Chart from '../pratical/charts'
import { gettingFluxData , gettingGraphData } from '../../api/api.js';
import Loading from '../general/loading'
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
      dataSelect: [],
      data: [{ label: "Brut", value: "Brut" }, { label: "Hourly", value: "Hour" }, { label: "Daily", value: "Day" }, { label: "Monthly", value: "Month" }],
      value: "Brut",
      visible: false,
      show: false,
      loading: true,
      changes: new Date(),
      date: new Date(),
      dateEnd: new Date(),
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSetValue = this.handleSetValue.bind(this);
    this.applyChange = this.applyChange.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  static contextType = TokenContext;

  //Life cycle method
  async componentDidMount() {
    if (this.props.route.params["graphId"] == 0) {
      await gettingFluxData(this.context.token, this.props.route.params["fluxId"][this.state.selectedIndex.row], this.state.value, this.state.date, this.state.date)
        .then(response => {
          if (response["success"] === 0) {
        
          }
          else {
            let data = response["data"]
            let reformatedData =  this.dataProcessing(data)
            this.setState({ format: data['format'], graphData: reformatedData, loading: false,dataSelect:this.props.route.params["fluxName"] })
          }
        })
    } else {
      await gettingGraphData(this.context.token, this.props.route.params["graphId"], this.state.value, this.state.date, this.state.date)
        .then(response => {
          if (response["success"] === 0) {

          }
          else {
            let data = response["data"]
            let reformatedData =  this.dataProcessing(data)
            this.setState({ format: data['format'], graphData: reformatedData, loading: false })
          }
        })
    }
  }
  //Method to update the charts whenever there is changes
  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value || prevState.date !== this.state.date || this.state.selectedIndex !== prevState.selectedIndex) {
      this.setState({ changes: this.state.date })
      this.componentDidMount()
    }
  }

  //Basic methods
  dataProcessing(data){
    let reformatedData = []
    let iter = []
    let keys = Object.keys(data["datas"][0])
    data["datas"].forEach(element => {
      keys.forEach(key => {
        if (key !== "x" && key !== "flux1") {
          iter = []
          iter.push(element.x, key, element[key])
          reformatedData.push(iter)
        }
      });
    });
    return reformatedData
  }

  //Handle the value of the radio button
  handleSetValue(value) {
    this.setState({ value: value })
  }

  //Handle the value of the date
  onChange(date) {
    this.setState({ date: date })
  };

  //handle the value of the select for Flux
  handleSelect(event) {
    this.setState({ selectedIndex: event })
  }

  applyChange(type, start, end) {
    //recup data and slice to be in the range
    if (type == 'cancel') {
      this.setState({ visible: false })
    } else {
      this.setState({ dateEnd: end, date: start, value: type, visible: false })
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

    if (this.state.loading) {
      return (
        <View>
          <Loading />
        </View>
      )
    }
    else {
      //<Text>Site : {this.context.siteName}</Text>
      return (

        <ScrollView>
          <TopNavigation
            title={this.props.route.params["graphId"] == 0 ? (<View><Text>Flux : </Text><SelectComp selectedIndex={this.state.selectedIndex} data={this.state.dataSelect} handleSelect={this.handleSelect} /></View>) : ("Graph")}
            accessoryLeft={this.backAction}
            accessoryRight={this.editAction}
          />

          <RadioButton data={this.state.data} setValue={this.handleSetValue} value={this.state.value}></RadioButton>
          <TimeGroup onChange={this.onChange} date={this.state.date} type={this.state.value}></TimeGroup>
          <Chart graphType={this.props.route.params["graphType"]} timeType={this.state.value} title={this.props.route.params["title"]} unit={this.props.route.params["unit"]} yTitle={this.props.route.params["yTitle"]} data={this.state.graphData} format={this.state.format} ></Chart>
          <Modal visible={this.state.visible}>
            <Settings apply={this.applyChange}></Settings>
          </Modal>

        </ScrollView>)
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
