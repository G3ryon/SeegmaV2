import React, { Component} from 'react';
import { StyleSheet,View,Platform, Dimensions} from 'react-native';
import { IndexPath,Icon, Text, Modal, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import RadioButton from '../pratical/radioButton';
import { TokenContext } from '../general/context';
import { TimeGroup } from '../pratical/timeGroup';
import Settings from './settings.js';
import SelectComp from '../pratical/select';
import FusionCharts from "react-native-fusioncharts";
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the graph with the data set choosen, there is also the modal for the settings
*/
// Preparing the chart data
const chartData = [
  {
    label: "Venezuela",
    value: "290"
  },
  {
    label: "Saudi",
    value: "260"
  },
  {
    label: "Canada",
    value: "180"
  },
  {
    label: "Iran",
    value: "140"
  },
  {
    label: "Russia",
    value: "115"
  },
  {
    label: "UAE",
    value: "100"
  },
  {
    label: "US",
    value: "30"
  },
  {
    label: "China",
    value: "30"
  }
];
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


      type: "column2d", // The chart type
       width: "100%", // Width of the chart
      height: "100%", // Height of the chart
      dataFormat: "json", // Data type
      dataSource: {
      // Chart Configuration
      chart: {
      caption: "Countries With Most Oil Reserves [2017-18]", //Set the chart caption
      subCaption: "In MMbbl = One Million barrels", //Set the chart subcaption
      xAxisName: "Country", //Set the x-axis name
      yAxisName: "Reserves (MMbbl)", //Set the y-axis name
      numberSuffix: "K",
      theme: "zune" //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: chartData}
      
    }
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: "file:///android_asset/fusioncharts.html"
      },
      //ios: require("./fusioncharts.html")
    });
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

        <View style={styles.chartContainer}>
        <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath}></FusionCharts>
        </View>
        <Modal visible={this.state.visible}>
          <Settings apply={this.applyChange}></Settings>
        </Modal>

      </View>)
  }
}
export default Graph_disp

const styles = StyleSheet.create({
  container: {
    flex: 1,


  },

  chartContainer: {
    height: 500,
    width : Dimensions.get('window').width,
    borderColor: "#000",
    borderWidth: 1
  }
});
