import React, { Component } from 'react';
import { View} from 'react-native';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
/*
route: name : name of the selected alarm 
       id   : id of the selected alarm
       date : last time the alarm wazs triggered
       infos  :  infos about the trigger
       description : infos about the alarm
       
RETURN: a view of the infos concerning the alarm choosen
*/

class Alarms_info extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.pressAction = this.pressAction.bind(this);
    }

    pressAction(event) {
        if (event == "details")
            this.props.navigation.navigate("Alarms history",{id:this.props.route.params['id'], name:this.props.route.params['name']})
        else {
            this.props.navigation.navigate("Alarms graph",{id:this.props.route.params['id'],name:this.props.route.params['name']})
        }
    }
    backIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
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
                <TopNavigation
                    title={"Alarm : " + this.props.route.params['name']}
                    accessoryLeft={this.backAction}
                />
                <View>
                    {this.props.route.params['status'] &&
                        <View>
                            <Text category='h1' status='primary'>Status : Triggered </Text>
                            <Text>Activated {this.props.route.params['date'].slice(4, 21)}</Text>
                            <Text>because : {this.props.route.params['infos']}</Text>
                        </View>}
                    {!this.props.route.params['status'] &&
                        <View>
                            <Text category='h1' status='primary'>Status : Not triggered </Text>
                        </View>}
                    <Text category='h2' status='primary'>Description</Text>
                    <Text>{this.props.route.params['description']}</Text>
                    <Text category='h2' status='primary'>Historic</Text>
                </View>
                <TilesView
                    pressTile={this.pressAction}
                    pressIcon={this.pressAction}
                    itemData={data} headerComp={<Text></Text>} />
            </View>)
    }

}
export default Alarms_info;
