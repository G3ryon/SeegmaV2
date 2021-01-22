import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

class Details_view  extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
        <View>
           <Button onPress={() => this.props.navigation.goBack()}>go back</Button>
        </View>)
    }
    
}
export default Details_view;