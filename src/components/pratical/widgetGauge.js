import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Platform } from "react-native";
import FusionCharts from "react-native-fusioncharts";


/*
https://www.fusioncharts.com/dev/chart-guide/gauges-and-widgets/angular-gauge

PROPS:  title : title of the widget
        max   : string of the max value of the gauge
        min   : string of the min value of the gauge
        unit  : string of the unit of the gauge
        color : json with the color and interval of them
        value : string actual value of the gauge
        target : json with dthe data for the target
        graphType : type of gauge can be thermometer, angulargauge,...

         
RETURN: a formated widget gauge
*/


export default class WidgetGauge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: {
        caption: this.props.title,
        subcaption: "",
        lowerlimit: this.props.min,
        upperlimit: this.props.max,
        showvalue: "1",
        numbersuffix: this.props.unit,
        theme: "fusion"
      },
      value: this.props.value,
      colorrange: {
        color: this.props.color
      },
      dials: {
        dial: [
          {
            value: this.props.value,
            tooltext: ""
          }
        ]
      },
      trendpoints: {
        point: this.props.target
      }
    }

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      //ios: require("./assets/fusioncharts.html"),
      android: { uri: "file:///android_asset/fusioncharts.html" }
    });
  }

  render() {
    return (
      
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.props.graphType}
            width={"100%"}
            height={"100%"}
            dataFormat={"json"}
            dataSource={this.state}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  chartContainer: {
    height: 200
  }
});

