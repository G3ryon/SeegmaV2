import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import {TokenContext} from '../../styles/themeContext.js'
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view for the choices of graphs to be displayed
*/

class Graph extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    static contextType = TokenContext;
    render(){
        return(
        <View>
           <Button onPress={() => this.props.navigation.navigate('Graph')}>graph</Button>
           <Text>{this.context.siteName}</Text>
        </View>)
    }
    
}
export default Graph;