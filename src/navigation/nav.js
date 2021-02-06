import React, {Component} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import Login from '../components/nonAuth/login.js';
import Signup from '../components/nonAuth/signup.js';
import Reset from '../components/nonAuth/reset.js';
import Home from '../components/siteSelection/home.js';
import Notif_center from '../components/notificationCenter/notifCenter.js';
import Details_view from '../components/general/detailsView.js';
import Dashboard from '../components/dashboard/dashboard.js';
import Widget from '../components/dashboard/widget.js';
import { createStackNavigator } from '@react-navigation/stack';
import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, 
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Alarms from '../components/alarm/alarms.js';
import Graph from '../components/graph/graph.js';
import Alarms_info from '../components/alarm/alarmInfo.js';
import Alarms_history from '../components/alarm/alarmsHistory.js';
import Alarms_occ from '../components/alarm/alarmOcc.js';
import { Graph_disp } from '../components/graph/graphDisp.js';
import {authentification} from '../api/api.js';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
//PROPS
// isSignIn  : bool displaying if the user is authenticated
// signIn    : method to set the isSignIn
// authToken : string with the token of the user
// setAuth   : method to set the authToken

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


class Nav extends Component{

    //Navigation of the Notification part, base on stack screens
    notifNav = () => {
        return(
            <Stack.Navigator headerMode={""}>
                <Stack.Screen name={"Notification center"}>{props => <Notif_center {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Notification"}>{props => <Details_view {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    //Navigation of the Dashboard part, base on stack screens
    dashNav = () => {
        return(
            <Stack.Navigator headerMode={""}>
                <Stack.Screen name={"Dashboard"}>{props => <Dashboard {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"widget"}>{props => <Widget {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    //Navigation of the Alarms part, base on stack screens
    alarmNav = () => {
        return(
            <Stack.Navigator headerMode={""}>
                <Stack.Screen name={"Alarms"}>{props => <Alarms {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms info"}>{props => <Alarms_info {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms history"}>{props => <Alarms_history {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms details"}>{props => <Details_view {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Alarms graph"}>{props => <Alarms_occ {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    //Navigation of the Graphs part, base on stack screens
    graphNav = () => {
        return(
            <Stack.Navigator headerMode={""}>
                <Stack.Screen name={"Graphs"}>{props => <Graph {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"Graph"}>{props => <Graph_disp {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            );
    }

    //Navigation of the non authentified part, base on stack screens
    nonAuthNav = () => {
        return(
            <Stack.Navigator headerMode={""}>
                <Stack.Screen name={"login"}>{props => <Login {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"signup"}>{props => <Signup {...props} other={this.props} />}</Stack.Screen>
                <Stack.Screen name={"reset"}>{props => <Reset {...props} other={this.props} />}</Stack.Screen>
            </Stack.Navigator>
            )
    }

    //Navigation of the authentified part, base on tab screens
    authBottomNav = () =>{
        return(
        <Tab.Navigator>
          <Tab.Screen name="Dashboard"  component={this.dashNav}/>
          <Tab.Screen name="Graph" component={this.graphNav}/>
          <Tab.Screen name="Alarms"  component={this.alarmNav}/>
        </Tab.Navigator>
        )
    }


    
    render(){
        if(this.props.isSignIn){
            //Part of the navigation concerning the authentified part of the app
            //The base of this part is the drawer accessible in each authentified screen
                return(
                        <Drawer.Navigator
                        drawerContentOptions={{
                          
                          itemStyle: {padding: 0},
                        }}
                        //Part to add DrawerItem and to hide routes contained into the drawer drom the user
                        drawerContent={(props) => {
                          const filteredProps = {
                            ...props,
                            state: {
                              ...props.state,
                              routeNames: props.state.routeNames.filter(
                                // To hide multiple options you can add & condition
                                (routeName) => {
                                  routeName !== 'notification'
                                  && routeName !== 'bottomNav';
                                },
                              ),
                              routes: props.state.routes.filter(
                                (route) =>
                                  route.name !== 'notification'
                                  && route.name !== 'bottomNav',
                              ),
                            },
                          };
                          return (
                            <DrawerContentScrollView {...filteredProps}>
                              <DrawerItemList {...filteredProps} />
                              <DrawerItem
                                label="Disconnect"
                                onPress={() => { this.props.setAuth(undefined); this.props.signIn(false); }}
                            />
                            </DrawerContentScrollView>
                          );
                        }}>
                        <Drawer.Screen name="home">{props => <SafeAreaView><Home {...props} other={this.props} setNotif={this.handleNotification} setSite={this.props.setSite}/></SafeAreaView>}</Drawer.Screen>
                        <Drawer.Screen name="notification" component={this.notifNav} />
                        <Drawer.Screen name="bottomNav" component={this.authBottomNav}/>
                    </Drawer.Navigator>
            
                    ) 
            
        }
        else{
            //Part of the navigation concerning the non-authentified part of the app
            return(
              
                <Stack.Navigator headerMode={""}>
                    <Stack.Screen name={"login"}>{props => <SafeAreaView><Login {...props} other={this.props} /></SafeAreaView>}</Stack.Screen>
                    <Stack.Screen name={"signup"}>{props => <SafeAreaView><Signup {...props} other={this.props} /></SafeAreaView>}</Stack.Screen>
                    <Stack.Screen name={"reset"}>{props => <SafeAreaView><Reset {...props} other={this.props} /></SafeAreaView>}</Stack.Screen>
                </Stack.Navigator>
                ) 
        }
        
    }
    
}
export default Nav;
