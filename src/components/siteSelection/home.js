import React, { Component } from 'react';
import { View, Image, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingSite } from '../../api/api.js';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the different site of the user
*/


//

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            favorite: null,
            nonFavorite: null,
        }
        this.handleTilePress = this.handleTilePress.bind(this);
        this.handleIconPress = this.handleIconPress.bind(this);
    }

    //function to change the site and redirect to the dashboard
    handleTilePress(id) {
        console.log(id)
        this.props.setSite(id)
        //this.props.navigation.navigate('bottomNav')
    }

    //function to change the favorite state
    handleIconPress(id) {
        console.log(id)
        let data = this.state.brutData
        //need to add api call to change fav status in DB
        console.log(data)
        data.forEach(element => {
            if(element["id"] == id){
                element["favorite"] = !element["favorite"]                
            }
        });
        let reformatedData = this.dataProcessing(data)
        this.setState({ data: reformatedData, brutData: data });
    }

    //function to format the json received from backend
    dataProcessing(data) {
        if (data.length === 0) {
            let reformatedData = [{ separator: true, title: "You don't have any site" }]
            return reformatedData
        } else {
            let reformatedData = [{ separator: true, title: 'Your favorite sites' }]
            let favorite = []
            let nonFavorite = []

            data.forEach(element => {
                if (element["favorite"]) {
                    favorite.push({
                        title: element["site"],
                        id: element["id"],
                        buttonIcon: 'star',
                        image: element["society"],
                        
                    })
                }
                nonFavorite.push({
                    title: element["site"],
                    id: element["id"],
                    buttonIcon: 'star',
                    image: element["society"],
                    fav: element["favorite"]
                })

            });

            reformatedData = reformatedData.concat(favorite);
            reformatedData.push({ separator: true, title: 'Your sites' });
            reformatedData = reformatedData.concat(nonFavorite);
            reformatedData.push({ separator: true, title: '' });
            this.setState({ favorite: favorite, nonFavorite: nonFavorite })
            return reformatedData
        }
    }

    //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='menu-outline' />
    );
    notifIcon = (props) => (
        <Icon {...props} name='bell-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.openDrawer()} />
    );
    notifAction = () => (
        <TopNavigationAction icon={this.notifIcon} onPress={() => this.props.navigation.navigate('notification')} />
    );

    //getting all the site of the user
    componentDidMount() {
        this.props.setSite(null)
        gettingSite(this.props.other.authToken, this.props.other.userId)
            .then(response => {
                if (response["success"] === 0) {

                }
                else {
                    let data = response["data"]
                    let reformatedData = this.dataProcessing(data)
                    this.setState({ data: reformatedData, brutData: data });
                }
            })
    }

    render() {

        return (
            <SafeAreaView>
                <TilesView itemData={this.state.data}
                    pressTile={this.handleTilePress}
                    pressIcon={this.handleIconPress}
                    headerComp={<TopNavigation
                        title="Home"
                        accessoryLeft={this.backAction}
                        accessoryRight={this.notifAction}
                    />}
                />
            </SafeAreaView>)
    }
}
export default Home;