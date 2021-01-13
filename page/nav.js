import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import Login from './non-auth/login.js';
import Signup from './non-auth/signup.js';
import Reset from './non-auth/reset.js';
import Home from './site_selection/home.js';
import Notif_center from './Notification_center/notif_center.js';
import Details_view from './details_view.js';
import Dashboard from './auth_site/dashboard/dashboard.js';
import Widget from './auth_site/dashboard/widget.js';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarms from './auth_site/alarm/alarms.js';
import Graph from './auth_site/graph/graph.js';
import Alarms_info from './auth_site/alarm/alarm_info.js';
import Alarms_history from './auth_site/alarm/alarms_history.js';
import Alarms_occ from './auth_site/alarm/alarm_occ.js';
import { Graph_disp } from './auth_site/graph/graph_disp.js';

//PROPS
// isSignIn  : bool displaying if the user is authenticated
// signIn    : method to set the isSignIn
// authToken : string with the token of the user
// setAuth   : method to set the authToken

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


class Nav extends Component{

    notifNav = () => {
        return(
            <Stack.Navigator headerMode={"screen"}>
                <Stack.Screen name={"Notification center"}>{props => <Notif_center {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Notification"}>{props => <Details_view {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    dashNav = () => {
        return(
            <Stack.Navigator headerMode={"screen"}>
                <Stack.Screen name={"Dashboard"}>{props => <Dashboard {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"widget"}>{props => <Widget {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    alarmNav = () => {
        return(
            <Stack.Navigator headerMode={"screen"}>
                <Stack.Screen name={"Alarms"}>{props => <Alarms {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms info"}>{props => <Alarms_info {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms history"}>{props => <Alarms_history {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms details"}>{props => <Details_view {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms graph"}>{props => <Alarms_occ {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    graphNav = () => {
        return(
            <Stack.Navigator headerMode={"screen"}>
                <Stack.Screen name={"Graphs"}>{props => <Graph {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Graph"}>{props => <Graph_disp {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    nonAuthNav = () => {
        return(//Non-auth
            <Stack.Navigator headerMode={"screen"}>
                <Stack.Screen name={"login"}>{props => <Login {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"signup"}>{props => <Signup {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"reset"}>{props => <Reset {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            )
    }



    authNav = () => {
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

    authBottomNav = () =>{
        return(
        <Tab.Navigator>
          <Tab.Screen name="Dashboard"  component={this.dashNav}/>
          <Tab.Screen name="Graph" component={this.graphNav}/>
          <Tab.Screen name="Alarms"  component={this.alarmNav}/>
        </Tab.Navigator>
        )
    }


    //{condition ? (<view1/>) : (<view2/>)}
    render(){
        if(this.props.isSignIn){
                return(
                    <Drawer.Navigator initialRouteName="home">
                        <Drawer.Screen name="home">{props => <Home {...props} other={this.props} setNotif={this.handleNotification} setSite={this.props.setSite}/>}</Drawer.Screen>
                        <Drawer.Screen name="notification" component={this.notifNav}
                        options={() => ({
                            drawerLabel: () => null,
                            title: undefined,
                            drawerIcon: () => null,
                        })}/>
                        <Drawer.Screen name="bottomNav" component={this.authBottomNav}
                        options={() => ({
                            drawerLabel: () => null,
                            title: undefined,
                            drawerIcon: () => null,
                        })}/>
                            
                    </Drawer.Navigator>
            
                    ) 
            
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
