import React, { Children, Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, Card, Text } from '@ui-kitten/components';
import WidgetGauge from '../pratical/widgetGauge';
import Chart from '../pratical/charts';
import {gettingWidgetData} from '../../api/api'
import { TokenContext } from '../general/context';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the selected widget
*/

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: [],
            target: [],
            format:[],
            data:[["1/1/2011", "Eaux usées", 826], ["1/1/2011", "Eaux", 636], ["1/1/2011", "Eaux propres", 694], ["1/2/2011", "Eaux usées", 389], ["1/2/2011", "Eaux", 810], ["1/2/2011", "Eaux propres", 953], ["1/3/2011", "Eaux usées", 798], ["1/3/2011", "Eaux", 556], ["1/3/2011", "Eaux propres", 474]],

        }
    }
    static contextType = TokenContext;
    //Lifecycle methods
    componentDidMount(){
        gettingWidgetData(this.context.token,this.props.route.params["id"],this.props.route.params["type"])
        .then(
            response => {
                if (response["success"] === 0) {
        
                }
                else {
                    let data = response["data"]
                    switch (this.props.route.params["type"]) {
                        case "data":
                            this.setState({data: data})
                            break;
                        case "chart":
                            this.setState({data: data["datas"], format:data["format"], graphType: data["graphType"], unit: data["unit"], yTitle: data["yTitle"], title: data['title']})
                            break;
                        case "gauge":
                            this.setState({ graphType: data["graphType"], color:data["color"], target:data["target"], unit: data["unit"], title: data['title'], max:data["max"] , min:data["min"], value:data["value"]})
                            break;
                        case "widget":
                            this.setState({ graphType: data["graphType"], unit: data["unit"], title: data['title'], max:data["max"] , min:data["min"], value:data["value"]})
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

        switch (this.props.route.params["type"]) {
            case "data":
                return (
                <Base>
                    {this.state.data.map(element => 
                        <Card status={element.type}>
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

        }

    }

}
export default Widget;
