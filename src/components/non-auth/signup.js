import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view for signing up
*/

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
