import React, { Component } from 'react';
import { View} from 'react-native';
import { Icon, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

/*
Route : name : Name of the route
        params : data linked to the route
        
props : setError : method to display message need a bool and a string 

RETURN: a view of the details for a selected items
*/

class Details_view extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    //Icons
    backIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
    );

    render() {
        if (this.props.route.name == 'Notification') {
            return (
                <View>
                    <TopNavigation
                        title={"Notification : " + this.props.route.params['name']}
                        accessoryLeft={this.backAction}
                    />
                    <Text category='h2' status='primary'>{this.props.route.params['date'].slice(4, 21)}</Text>
                    <Text category='h2'>Description</Text>
                    <Text>{this.props.route.params['description']}</Text>
                    <Text category='h2'>More details</Text>
                    <Text>{this.props.route.params['infos']}</Text>
                </View>)
        }
        else if (this.props.route.name == "Alarms details") {
            return (
                <View>
                    <TopNavigation
                        title={"Alarm : " + this.props.route.params['name']}
                        accessoryLeft={this.backAction}
                    />
                    <Text category='h2' status='primary'>{this.props.route.params['date'].slice(0, 21)}</Text>
                    <Text category='h2'>Details</Text>
                    <Text>{this.props.route.params['infos']}</Text>
                </View>
            )
        } else {

        }
    }

}
export default Details_view;
