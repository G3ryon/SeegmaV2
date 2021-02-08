import React, {Component} from 'react';
import { View, Image, TextInput, ScrollView, SafeAreaView,FlatList } from 'react-native';
import { Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the different site of the user
*/
const data = [
    { separator: true},
    {
        title: 'Title for Item',
        description: 'Description for Item',
    },
    {
        title: 'Title for Item',
        description: 'Description for Item',
    },
    { separator: true},
    {
        title: 'Title for Item',
        description: 'Description for Item',
    },
  ];

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

     renderItem= (item, index) => {
        return (
          <Text>erzerfz</Text>
        )
      }

    render(){
        return(
        <SafeAreaView>
           
           <TilesView itemData={data} Header={<TopNavigation title="Home"  accessoryLeft={this.BackAction} accessoryRight={this.NotifAction}/>}/>
        
        </SafeAreaView>)
    }
    
}
export default Home;/* 
<TopNavigation title="Home"  accessoryLeft={this.BackAction} accessoryRight={this.NotifAction}/>
<Text>Your favorites sites</Text>
           <ScrollView onTouchStart={(ev) => { this.setState({ content: { flex: 1 } }); }}
									onMomentumScrollEnd={(e) => { this.setState({ content: {} }); }}
									onScrollEndDrag={(e) => { this.setState({ content: {} }); }}
									style={{ margin: 2, maxHeight: 200 }}>
           <TilesView></TilesView>
           </ScrollView><Button onPress={() => this.props.navigation.navigate('bottomNav')}>site</Button>
           <Button onPress={() => this.props.other.setSite('home')}>home site</Button>
           <Text>Your sites</Text>*/