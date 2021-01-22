import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import Login from './non-auth/login.js';
import Signup from './non-auth/signup.js';
import Reset from './non-auth/reset.js';
import Home from './site_selection/home.js';
import Notif_center from './Notification_center/notif_center.js';
import Notif from './Notification_center/notification.js'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//PROPS
// isSignIn  : bool displaying if the user is authenticated
// signIn    : method to set the isSignIn
// authToken : string with the token of the user
// setAuth   : method to set the authToken

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
        
    }

 

    //{condition ? (<view1/>) : (<view2/>)}
    render(){
        if(this.props.isSignIn){
            if(this.props.notif){//Notification center
                return(
                    <Stack.Navigator headerMode={"screen"}>
                        <Stack.Screen name={"Notification center"}>{props => <Notif_center {...props} other={this.props} />}</Stack.Screen>
                        <Stack.Screen name={"Notification"}>{props => <Notif {...props} other={this.props} />}</Stack.Screen>
                    </Stack.Navigator>
                    ) 
            }else
            if (this.props.site != undefined){//auth and site selectionned
                return(
                    <View>
                        <Button onPress={() => this.props.setSite(undefined)}>home site</Button>
                    </View>
                    ) 
            } else {
                return(//auth and site to be selectionned
                    <Drawer.Navigator initialRouteName="home">
                        <Drawer.Screen name="home">{props => <Home {...props} other={this.props} setNotif={this.handleNotification} setSite={this.props.setSite}/>}</Drawer.Screen>
                        <Drawer.Screen name="homedd" 
                        options={() => ({
                            drawerLabel: () => null,
                            title: undefined,
                            drawerIcon: () => null,
                        })}>
                            {props => <Home {...props} other={this.props} setNotif={this.handleNotification} setSite={this.props.setSite}/>}</Drawer.Screen>
                    </Drawer.Navigator>
            
                    ) 
            }
        }
        else{
            return(//Non-auth
                <Stack.Navigator headerMode={"screen"}>
                    <Stack.Screen name={"login"}>{props => <Login {...props} other={this.props} />}</Stack.Screen>
                    <Stack.Screen name={"signup"}>{props => <Signup {...props} other={this.props} />}</Stack.Screen>
                    <Stack.Screen name={"reset"}>{props => <Reset {...props} other={this.props} />}</Stack.Screen>
                </Stack.Navigator>
                ) 
        }
        
    }
    
}
export default Nav;
