import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Alarms extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Button onPress={() => this.props.other.signIn(false)}>DISCONNECT</Button>
           <Button onPress={() => this.props.navigation.navigate("Alarms info")}>details alarms</Button>
        </View>)
    }
    
}
export default Alarms;