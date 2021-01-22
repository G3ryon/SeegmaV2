import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';
import Input from '../../components/input.js'

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            password: "jujubeberhot",
            login: "juju_beber",
        }
        this.handlePassword = this.handlePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handlePassword(text) {
        this.setState({ password: text });
    }

    handleLogin(text) {
        this.setState({ login: text });
    }

    render(){
        return(
        <View>
           <Image source={logo}/>
           <Input type={"text"} required={true} readonly={false} value={this.state.login} onChange={this.handleLogin} placeHolder={"Login"}></Input>
           <Input type={"password"} required={true} readonly={false} value={this.state.password} onChange={this.handlePassword} placeHolder={"Password"}></Input>
           <Button onPress={() => this.props.other.signIn(true)}>Login</Button>
           <Button onPress={() => this.props.navigation.navigate('signup')}>SignUp</Button>
           <Button onPress={() => this.props.navigation.navigate('reset')}>Forgot your password?</Button>
           
        </View>)
    }
    
}
export default Login;
