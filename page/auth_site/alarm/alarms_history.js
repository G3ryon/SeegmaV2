import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Alarms_history extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Button onPress={() => this.props.navigation.navigate("Alarms details")}>details</Button>
        </View>)
    }
    
}
export default Alarms_history;