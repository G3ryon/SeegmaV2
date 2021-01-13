import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Notif_center extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           
           <Text>Notif center</Text>
           <Button onPress={() => this.props.navigation.navigate('Notification')}>NOTIFICATION</Button>
           <Button onPress={() => this.props.navigation.goBack()}>go back</Button>

        </View>)
    }
    
}
export default Notif_center;