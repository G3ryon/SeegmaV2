import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Button onPress={() => this.props.other.signIn(false)}>DISCONNECT</Button>
           <Button onPress={() => this.props.other.setNotif(true)}>NOTIFICATION</Button>
           <Text>{this.props.other.isSignIn}</Text>
           <Button onPress={() => this.props.navigation.navigate('home')}>1</Button>
           <Button onPress={() => this.props.navigation.navigate('notification')}>notif</Button>
           <Button onPress={() => this.props.navigation.navigate('bottomNav')}>site</Button>
           <Button onPress={() => this.props.other.setSite('home')}>home site</Button>
           

        </View>)
    }
    
}
export default Home;