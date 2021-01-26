import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the different site of the user
*/

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           
           <Text>{this.props.other.isSignIn}</Text>
           <Button onPress={() => this.props.navigation.navigate('home')}>1</Button>
           <Button onPress={() => this.props.navigation.navigate('notification')}>notif</Button>
           <Button onPress={() => this.props.navigation.navigate('bottomNav')}>site</Button>
           <Button onPress={() => this.props.other.setSite('home')}>home site</Button>
           

        </View>)
    }
    
}
export default Home;