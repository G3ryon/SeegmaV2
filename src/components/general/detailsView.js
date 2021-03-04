import React, { Component } from 'react';
import { View, Image, TextInput } from 'react-native';
import { Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the details for a selected items
*/

class Details_view extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
        if (this.props.type == 'Notification') {
            return (
                <View>
                    <TopNavigation
                        title={"Notification : " + this.props.data['name']}
                        accessoryLeft={this.backAction}
                    />
                    <Text category='h2' status='primary'>{this.props.data['date'].slice(4, 21)}</Text>
                    <Text category='h2'>Description</Text>
                    <Text>{this.props.data['description']}</Text>
                    <Text category='h2'>More details</Text>
                    <Text>{this.props.data['infos']}</Text>
                </View>)
        }
        else if (this.props.type == 'Alarm') {
            return (
                <View>
                    <TopNavigation
                        title={"Alarm : " + this.props.data['name']}
                        accessoryLeft={this.backAction}
                    />
                    <Text category='h2' status='primary'>{this.props.data['date'].slice(4, 21)}</Text>
                    <Text category='h2'>Details</Text>
                    <Text>{this.props.data['infos']}</Text>
                </View>
            )
        } else {

        }
    }

}
export default Details_view;
