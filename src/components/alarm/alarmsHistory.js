import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the activation of the choosen alarm
*/

class Alarms_history extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reformatedData : [],
        }
        this.pressAction = this.pressAction.bind(this);
    }


    pressAction(event) {
        let data = this.props.alarmData['data']
        let reformatedData = []
        data.forEach(element => {
            if(element['id'] == event){
                reformatedData.push({
                    name : this.props.alarmData['name'],
                    date : element['date'],
                    infos : element['infos']
                })
            }
        });
        this.props.handleDetail(reformatedData[0])
        console.log(reformatedData)
        this.props.navigation.navigate("Alarms details")
    }

    dataProcessing() {

        let data = this.props.alarmData['data']
        console.log(data)
        let reformatedData = []
        data.forEach(element => {
            reformatedData.push({
                title: element["date"].slice(4, 21),
                id: element["id"],
                buttonIcon: 'chevron-right',
                icon: 'bar-chart',
            })
        });
        this.setState({reformatedData:reformatedData})
    }


    componentDidMount(){
        this.dataProcessing()
    }

    //Method for declaring constant and navigation
    //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='menu-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.openDrawer()} />
    );

    render() {
        const data = [
            {
                title: "Historic by graph",
                id: "graph",
                buttonIcon: 'arrow-ios-forward-outline',
                icon: 'bar-chart'
            },
            {
                title: "Historic in details",
                id: "details",
                buttonIcon: 'arrow-ios-forward-outline',
                icon: 'search-outline'
            }
        ]
        return (
            <View>
                <TilesView
                    itemData={this.state.reformatedData}
                    pressTile={this.pressAction}
                    pressIcon={this.pressAction}
                    headerComp={<TopNavigation
                        title={<Text>{"Alarm : " + this.props.alarmData['name']}</Text>}
                        accessoryLeft={this.backAction}
                    />}
                />
            </View>)
    }

}
export default Alarms_history;