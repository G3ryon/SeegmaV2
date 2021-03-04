import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingUserAlarms } from '../../api/api.js';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the alarms of the user
*/

class Alarms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,


        }
        this.handleIconPress = this.handleIconPress.bind(this);
    }
    //handle the preparation to see the widget
    handleIconPress(id) {
        let data = null
        this.state.brutData.forEach(element => {
            if (element["id"] == id) {
                data = element
            }
        });
        this.props.setAlarm(data)
        this.props.navigation.navigate('Alarms info')
    }

    //Methods immplicating the life cycle
    //Initialisation of the data to be displayed
    componentDidMount() {
        this.props.setAlarm(null)
        gettingUserAlarms(this.props.other.authToken, this.props.other.userId, this.props.other.site)
            .then(response => {
                if (response["success"] === 0) {
                }
                else {
                    let data = response["data"]
                    let reformatedData = this.dataProcessing(data)
                    this.setState({data: reformatedData, brutData: data });
                }
            })
    }

    //General Methods
    //function to format the data of the choosen option
    dataProcessing(data) {

        if (data.length === 0) {
            let reformatedData = [{ separator: true, title: "You don't have any alarms" }]
            return reformatedData
        } else {
            let reformatedData = [{ separator: true, title: "" }]

            data.forEach(element => {
                if (element["status"]) {
                    reformatedData.push({
                        title: element["name"],
                        id: element["id"],
                        buttonIcon: 'chevron-right',
                        description: element['description'],
                        icon: 'alert-triangle',
                    })
                } else {
                    reformatedData.push({
                        title: element["name"],
                        id: element["id"],
                        buttonIcon: 'chevron-right',
                        description: element['description'],
                        icon: '',
                    })
                }


            });
            reformatedData.push({ separator: true, title: '' });
            return reformatedData
        }
    }

    //Method for declaring constant and navigation
    //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='menu-outline' />
    );
    notifIcon = (props) => (
        <Icon {...props} name='bell-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.openDrawer()} />
    );
    notifAction = () => (
        <TopNavigationAction icon={this.notifIcon} onPress={() => this.props.navigation.navigate('notification')} />
    );

    render() {
        const data = [
            {
                title: "Alarms 2",
                id: "12345",
                buttonIcon: 'arrow-ios-forward-outline',
                icon: 'alert-triangle'
            },
            {
                title: "Alarms 2",
                id: "12345s",
                buttonIcon: 'arrow-ios-forward-outline',
                icon: ''
            }
        ]
        return (
            <View>
                <TilesView itemData={this.state.data}
                    pressTile={this.handleIconPress}
                    pressIcon={this.handleIconPress}
                    headerComp={<TopNavigation
                        title="Alarms"
                        accessoryLeft={this.backAction}
                        accessoryRight={this.notifAction}
                    />}
                />
            </View>)
    }

}
export default Alarms;
//<Button onPress={() => this.props.navigation.navigate("Alarms info")}>details alarms</Button>