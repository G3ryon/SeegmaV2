import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
            <Image source={logo}/>
           <Text>Signup</Text>
           <Button onPress={() => this.props.navigation.navigate('login')}>I already have an account</Button>
        </View>)
    }
    
}
export default Signup;
