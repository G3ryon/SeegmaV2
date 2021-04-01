import React, { Children, Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, Card, Text } from '@ui-kitten/components';
import WidgetGauge from '../pratical/widgetGauge';
import Chart from '../pratical/charts';
import {gettingWidgetData} from '../../api/api'
import { TokenContext } from '../general/context';
import Loading from "../general/loading";
/*
route : id : id of the widget
        type : type of widget
        name : name of the widget
props : setError : method to display message need a bool and a string 

RETURN: a view of the selected widget
*/

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: [],
            target: [],
            format:[],
            data:[],
            loading:true,
        }
    }
    static contextType = TokenContext;
    //Lifecycle methods
   componentDidMount(){
       gettingWidgetData(this.context.token,this.props.route.params["id"],this.props.route.params["type"])
        .then(
            response => {
                if (response["status"] == "error" || response["status"] == "fail") {
                    this.props.setError(true,response["message"])
                }
                else {
                    
                    let data = response["data"]
                    switch (this.props.route.params["type"]) {
                        case "data":
                            this.setState({loading:false,data: data})
                            break;
                        case "chart":
                            this.setState({loading:false,data: data.datas, format:data.format, graphType: data["graphType"], unit: data["unit"], yTitle: data["yTitle"], title: data['title']})
                            break;
                        case "gauge":
                            this.setState({loading:false,graphType: data["graphType"], color:data["color"], target:data["target"], unit: data["unit"], title: data['title'], max:data["max"] , min:data["min"], value:data["value"]})
                            break;
                        case "widget":
                            this.setState({ loading:false,graphType: data["graphType"], unit: data["unit"], title: data['title'], max:data["max"] , min:data["min"], value:data["value"]})
                            break;}
                }}
        )
    }

    //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
    );


    render() {
        const Base = (props) => {
            return (<View>
                <TopNavigation
                    title={this.props.route.params["name"]}
                    accessoryLeft={this.backAction}
                />
                {props.children}
            </View>)
        }
        if(this.state.loading){
            return(
                <Loading/>
            )
            
        }else{
        //view in function of the type of widget to display
        switch (this.props.route.params["type"]) {
            case "data":
                return (
                <Base>
                    {this.state.data.map(element => 
                        <Card key={element.infos} status={element.type}>
                            <Text>{element.infos}</Text>
                        </Card>
                        )}
                    </Base>)

            case "chart":
                return (
                    <Base>
                        <Chart graphType={this.state.graphType} timeType={"Brut"} title={this.state.title} unit={this.state.unit} yTitle={this.state.yTitle} data={this.state.data}
                            format={this.state.format} />
                    </Base>)

            case "gauge":
                return (
                    <Base>
                        <WidgetGauge graphType={this.state.graphType} title={this.state.title} max={this.state.max} min={this.state.min} unit={this.state.unit} color={this.state.color} value={this.state.value} target={this.state.target} />
                    </Base>)

            case "widget":
                return (
                    <Base>
                        <WidgetGauge graphType={this.state.graphType} title={this.state.title} max={this.state.max} min={this.state.min} unit={this.state.unit} color={this.state.color} value={this.state.value} target={this.state.target} />
                    </Base>)

        }}

    }

}
export default Widget;
