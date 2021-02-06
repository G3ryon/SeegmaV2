import React, {Component} from 'react';
import { View, Image, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the different site of the user
*/

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    BackAction = () => (
        <TopNavigationAction icon={this.BackIcon} onPress={() => this.props.navigation.openDrawer()}/>
    );
    BackIcon = (props) => (
        <Icon {...props} name='menu-outline'/>
    );
    NotifIcon = (props) => (
        <Icon {...props} name='bell-outline'/>
    );
    NotifAction = () => (
        <TopNavigationAction icon={this.NotifIcon} onPress={() => this.props.navigation.navigate('notification')}/>
    );

    render(){
        return(
            <View>
                
        
        <SafeAreaView>
        
        <TopNavigation title="Home"  accessoryLeft={this.BackAction} accessoryRight={this.NotifAction}/>
            <Text>Your favorites sites</Text>
           <ScrollView onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
									onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
									onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
									style={{ margin: 10, maxHeight: 200 }}>
           <Button onPress={() => this.props.navigation.navigate('bottomNav')}>site</Button>
           <Button onPress={() => this.props.other.setSite('home')}>home site</Button>
           </ScrollView>
           <Text>Your sites</Text>
           <ScrollView onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
									onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
									onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
									style={{ margin: 10, maxHeight: 200 }}>
           <Button onPress={() => this.props.navigation.navigate('bottomNav')}>site</Button>
           <Button onPress={() => this.props.other.setSite('home')}>home site</Button>
           </ScrollView>


        
        </SafeAreaView></View>)
    }
    
}
export default Home;