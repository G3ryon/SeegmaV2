import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingAlarmsList } from '../../api/api.js';
import {TokenContext} from '../../styles/themeContext.js'
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
            brutData:[]
        }
        this.pressAction = this.pressAction.bind(this);
    }
    static contextType = TokenContext;

    pressAction(event) {
        let data = this.state.brutData
        data.forEach(element => {
            if(element['id'] == event){
                this.props.navigation.navigate("Alarms details",{
                    name : this.props.route.params['name'],
                    date : element['date'],
                    infos : element['infos']
                })
            }
        });
        
    }

    dataProcessing(data) {
        let reformatedData = []
        data.forEach(element => {
            reformatedData.push({
                title: element["date"].slice(4, 21),
                id: element["id"],
                buttonIcon: 'chevron-right',
                icon: 'bar-chart',
            })
        });
        this.setState({reformatedData:reformatedData, brutData:data})
    }


    componentDidMount(){
        console.log("dddd")
        gettingAlarmsList(this.context.token,this.context.site)
        .then(response => {
            if (response["success"] === 0) {
            }
            else {
                let data = response["data"]
                this.dataProcessing(data)
            }
        })
    }

    componentDidUpdate(prevprops){
        if(prevprops.route !== this.props.route){
            this.componentDidMount
        }
    }

    //Method for declaring constant and navigation
    //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
    );

    render() {

        return (
            <View>
                <TilesView
                    itemData={this.state.reformatedData}
                    pressTile={this.pressAction}
                    pressIcon={this.pressAction} 
                    headerComp={<TopNavigation
                        title={<Text>{"Alarme : " + this.props.route.params['name']}</Text>}
                        accessoryLeft={this.backAction}
                    />}
                />
            </View>)
    }

}
export default Alarms_history;