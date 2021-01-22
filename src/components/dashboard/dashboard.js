import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Button onPress={() => this.props.other.signIn(false)}>DISCONNECT</Button>
           <Button onPress={() => this.props.navigation.navigate("widget")}>Widget</Button>
        </View>)
    }
    
}
export default Dashboard;