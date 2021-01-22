import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import logo from '../../assets/logo.png';
import Input from '../../components/input.js'

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
