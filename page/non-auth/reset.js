import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Reset extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Text>Reset</Text>
           <Button onPress={() => this.props.navigation.navigate('login')}>1</Button>
           <Button onPress={() => this.props.navigation.navigate('signup')}>2</Button>
           <Button onPress={() => this.props.navigation.navigate('reset')}>3</Button>
        </View>)
    }
    
}
export default Reset;
