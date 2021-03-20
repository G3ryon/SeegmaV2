import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import FusionCharts from 'react-native-fusioncharts';

/*
PROPS: data : Json contenant les infos du graphique

       format : format des données contenues dans le JSON 
       [{"format": "%Y-%-m-%-d", "name": "Time", "type": "date"}, {"name": "Electricity", "type": "number"}]

       unit : string de l'unité pour les valeurs

       title : titre du graphe

       //yValue : link in the schema to the data for y



RETURN: un graphique contenant toutes les infos
*/

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 'timeseries',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        data: null,
        "chart": {
          "theme": "gammel"
        },
        caption: {
          text: this.props.title
        },
        subcaption: {
          text: ""
        },
        series: this.props.format[1].name,
        yAxis: [{
          plot: [
            {
              value: this.props.format[2].name,
              type: this.props.graphType
            }
          ],
          title: this.props.yTitle,
          format: {
            suffix: this.props.unit
          }
        }
      ]

      },
      schemaJson: null,
      dataJson: null
    };

    this.libraryPath = Platform.select({
        // Specify fusioncharts.html file location
        android: {
          uri: "file:///android_asset/fusioncharts.html"
        },
        //ios: require("./fusioncharts.html")
      });
  }

  componentDidMount() {
    this.fetchDataAndSchema();
  }

  fetchDataAndSchema() {
    
    const dFetch =this.props.data ;
    // This is the remote url to fetch the schema.
    const sFetch = this.props.format//[{"format": "%Y-%-m-%-d/%-Ih%-M", "name": "Time", "type": "date"}, {"name": "Electricity", "type": "number"}]
    
    Promise.all([dFetch, sFetch]).then(res => {
      //console.log(this.props.data)
      const data = res[0];
      const schema = res[1];


      this.setState({ dataJson: data, schemaJson: schema });
    });
  }

  render() {
    const sFetch = this.props.format
    return (
      
        <View style={styles.chartContainer}>
          <FusionCharts
            dataJson={this.props.data}
            schemaJson={sFetch}
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
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
    textAlign: 'center',
    marginBottom: 10
  },
  chartContainer: {
    height: 500
  }
});