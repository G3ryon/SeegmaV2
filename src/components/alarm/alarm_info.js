import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the infos concerning the alarm choosen
*/

class Alarms_info extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Button onPress={() => this.props.navigation.navigate("Alarms history")}>history</Button>
           <Button onPress={() => this.props.navigation.navigate("Alarms graph")}>graph</Button>
           
        </View>)
    }
    
}
export default Alarms_info;