import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Text>Login page</Text>
           <Button onPress={() => this.props.other.signIn(true)}>LOGIN</Button>
           <Button onPress={() => this.props.navigation.navigate('login')}>Login page</Button>
           <Button onPress={() => this.props.navigation.navigate('signup')}>SignUp</Button>
           <Button onPress={() => this.props.navigation.navigate('reset')}>Reset</Button>
           
        </View>)
    }
    
}
export default Login;
