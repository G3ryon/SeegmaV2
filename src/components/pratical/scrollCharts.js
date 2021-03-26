import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Platform } from "react-native";
import FusionCharts from "react-native-fusioncharts";

//https://www.fusioncharts.com/dev/chart-guide/standard-charts/scroll-charts


/*
PROPS:  title  : title of the graph
        yTitle : title for the Y axis
        xTitle : title for the X axis
        category :JSON data for the Y axis [{label : xx},{label : XX}]
        data : JSON data for the graph classified by the category [{value : xx},{value : XX}]
       
RETURN: a view of the activation of the choosen alarm into a graph
*/

export default class ScrollCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: {
        caption: this.props.title,
        subcaption: "",
        plottooltext: "$dataValue "+this.props.yTitle,
        yaxisname: this.props.yTitle,
        xaxisname: this.props.xTitle,
        
        scrollHeight: "12",
        scrollPadding: "5",
        theme: "gammel"
      },
      categories: [
        {
          category: this.props.category
          
        }
      ],
      dataset: [
        {
          data: this.props.data
        }
      ]
    }

    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: "file:///android_asset/fusioncharts.html"
      },
      //ios: require("./assets/fusioncharts.html")
    });
  }

  render() {
    console.log(this.state)
    return (
        <View style={styles.chartContainer}>
          <FusionCharts
            type={"scrollColumn2d"}
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
    height: 400
  }
});


