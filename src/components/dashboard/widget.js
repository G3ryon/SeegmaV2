import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { IndexPath, Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction, Select, SelectItem } from '@ui-kitten/components';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the selected widget
*/

class Widget extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

        //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
    );

    render(){
        return(
        <View>
           <TopNavigation
                        title={this.props.widgetData["title"]}
                        accessoryLeft={this.backAction}
                    />
        </View>)
    }
    
}
export default Widget;