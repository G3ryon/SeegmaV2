import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';
import Input from '../../components/pratical/input.js';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view to handle the reset of a password
*/

class Reset extends Component{
    constructor(props){
        super(props);
        this.state = {
            mail: "juju_beber@gmail.com",

        }
        this.handleMail = this.handleMail.bind(this);
    }

    handleMail(text) {
        this.setState({ mail: text });
    }

    render(){
        return(
        <View>
           <Image source={logo}/>
           <Input type={"text"} required={true} readonly={false} value={this.state.mail} onChange={this.handleMail} placeHolder={"Mail"}></Input>
           <Button onPress={() => this.props.navigation.navigate('login')}>I remembered my password</Button>
        </View>)
    }
    
}
export default Reset;
