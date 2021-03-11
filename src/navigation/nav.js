import React, { Component, useContext } from 'react';
import { View, Image, TextInput } from 'react-native';
import { IndexPath, Icon} from '@ui-kitten/components';
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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { default as theme } from '../../theme.json';
import {getData, storeData } from '../api/api.js';
import Loading from '../components/general/loading'
import {TokenContext} from '../styles/themeContext.js'
//PROPS
// isSignIn  : bool displaying if the user is authenticated
// signIn    : method to set the isSignIn
// authToken : string with the token of the user
// setAuth   : method to set the authToken
// site      : Id of the site currently selected
// setSite   : method to set the selected site

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const navigationRef = React.createRef();

export function reset(name) {
  navigationRef.current?.reset({index:0,routes:[{name:name}],});
}

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signIn:'login',
      loading: true
    }

  }


  reset(){
    this.signIn = false
    this.context.handleToken(undefined)
    storeData({authToken: undefined,
       signIn: 'login'}, '@storage_Key')
    reset('login')
  }

  //Methods of each navigation view
  //Navigation of the Notification part, base on stack screens
  notifNav = () => {
    return (
      <Stack.Navigator headerMode={""}>
        <Stack.Screen name={"Notification center"}>{props => <SafeAreaView><Notif_center {...props}/></SafeAreaView>}</Stack.Screen>
        <Stack.Screen name={"Notification"}>{props => <SafeAreaView><Details_view {...props} /></SafeAreaView>}</Stack.Screen>
      </Stack.Navigator>
    );
  }

  //Navigation of the Dashboard part, base on stack screens
  dashNav = () => {
    return (
      <Stack.Navigator headerMode={""}>
        <Stack.Screen name={"Dashboard"}>{props => <SafeAreaView><Dashboard {...props}/></SafeAreaView>}</Stack.Screen>
        <Stack.Screen name={"widget"}>{props => <SafeAreaView><Widget {...props}/></SafeAreaView>}</Stack.Screen>
      </Stack.Navigator>
    );
  }

  //Navigation of the Alarms part, base on stack screens
  alarmNav = () => {
    return (
      <Stack.Navigator headerMode={""}>
        <Stack.Screen name={"Alarms"}>{props => <SafeAreaView><Alarms {...props}/></SafeAreaView>}</Stack.Screen>
        <Stack.Screen name={"Alarms info"}>{props => <SafeAreaView><Alarms_info {...props}/></SafeAreaView>}</Stack.Screen>
        <Stack.Screen name={"Alarms history"}>{props => <SafeAreaView><Alarms_history {...props}/></SafeAreaView>}</Stack.Screen>
        <Stack.Screen name={"Alarms details"}>{props => <SafeAreaView><Details_view {...props} /></SafeAreaView>}</Stack.Screen>
        <Stack.Screen name={"Alarms graph"}>{props => <SafeAreaView><Alarms_occ {...props}/></SafeAreaView>}</Stack.Screen>
      </Stack.Navigator>
    );
  }

  //Navigation of the Graphs part, base on stack screens
  graphNav = () => {
    return (
      <Stack.Navigator headerMode={""}>
        <Stack.Screen name={"Graphs"}>{props => <Graph {...props}/>}</Stack.Screen>
        <Stack.Screen name={"Graph"}>{props => <Graph_disp {...props}/>}</Stack.Screen>
      </Stack.Navigator>
    );
  }

  //Navigation of the non authentified part, base on stack screens
  nonAuthNav = () => {
    return (
      <Stack.Navigator headerMode={""}>
        <Stack.Screen name={"login"}>{props => <Login {...props} other={this.props} />}</Stack.Screen>
        <Stack.Screen name={"signup"}>{props => <Signup {...props} />}</Stack.Screen>
        <Stack.Screen name={"reset"}>{props => <Reset {...props} />}</Stack.Screen>
      </Stack.Navigator>
    )
  }

  //Navigation of the authentified part, base on tab screens
  authBottomNav = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused ? 'browser' : 'browser-outline';
            } else if (route.name === 'Graph') {
              iconName = focused ? 'bar-chart-2' : 'bar-chart';
            } else if (route.name === 'Alarms') {
              iconName = focused ? 'clock' : 'clock-outline';
            }
            // Icon for each tab
            return <Icon style={{
              width: 32,
              height: 32,
            }} fill={theme["color-basic-600"]} name={iconName} />
          },
        })}>
        <Tab.Screen name="Dashboard" component={this.dashNav} />
        <Tab.Screen name="Graph" component={this.graphNav} />
        <Tab.Screen name="Alarms" component={this.alarmNav} />
      </Tab.Navigator>
    )
  }
//Part of the navigation concerning the authentified part of the app
      //The base of this part is the drawer accessible in each authentified screen
  drawerNav = () => {
    return(
      <Drawer.Navigator
          drawerContentOptions={{
            
            itemStyle: { padding: 0 },
          }}
          initialRouteName = {"home"}
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
                  onPress={() => { this.reset();}}
                />
              </DrawerContentScrollView>
            );
          }}>
          <Drawer.Screen name="home">{props => <SafeAreaView><Home {...props} setSiteData={this.handlesiteData} /></SafeAreaView>}</Drawer.Screen>
          <Drawer.Screen name="notification" component={this.notifNav} />
          <Drawer.Screen name="bottomNav" component={this.authBottomNav} />
        </Drawer.Navigator>
    )
  }
  async componentDidMount(){
    
    let data = await getData('@storage_Key');
    console.log(data)
    if(data !== null)
    this.context.handleToken(data["authToken"])
    this.setState({signIn:data["signIn"],loading : false})
  }
  static contextType = TokenContext;
  render() {
      //Part of the navigation concerning the non-authentified part of the app and the redirection to the authentified part
      if(this.state.loading){
        return(
          <View>
            <Loading/>
          </View>
        )
      }
      else{
        console.log(this.state.signIn)
      return (
        <Stack.Navigator headerMode={""} initialRouteName={this.state.signIn}>
          <Stack.Screen name={"login"}>{props => <SafeAreaView><Login {...props}  /></SafeAreaView>}</Stack.Screen>
          <Stack.Screen name={"signup"}>{props => <SafeAreaView><Signup {...props} /></SafeAreaView>}</Stack.Screen>
          <Stack.Screen name={"reset"}>{props => <SafeAreaView><Reset {...props} /></SafeAreaView>}</Stack.Screen>
          <Stack.Screen name={"drawer"} component={this.drawerNav}></Stack.Screen>
        </Stack.Navigator>
      )}
    

  }

}
export default Nav;
