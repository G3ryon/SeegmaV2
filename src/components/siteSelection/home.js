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
        other.site      : Id of the site currently selected
        other.setSite   : method to set the selected site
        other.userId    : Id of the current user
        other.setUserId : method to set the user id
        setSiteData     : method to set the variable with the data of the selected site
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

    //Methods for basic state update
    //function to change the site and redirect to the dashboard
    handleTilePress(id) {
        let data = this.state.brutData
        let siteData = null
        data.forEach(element => {
            if (element["id"] == id) {
                siteData = element
            }
        });
        this.props.setSiteData(siteData)
        this.props.other.setSite(id)
        this.props.navigation.navigate('bottomNav')
    }

    //function to change the favorite state
    handleIconPress(id) {
        let data = this.state.brutData
        //need to add api call to change fav status in DB
        data.forEach(element => {
            if (element["id"] == id) {
                element["favorite"] = !element["favorite"]
            }
        });
        let reformatedData = this.dataProcessing(data)
        this.setState({ data: reformatedData, brutData: data });
    }

    //Methods immplicating the life cycle
    //getting all the site of the user
    componentDidMount() {
        
        this.props.other.setSite(null)
        this.props.setSiteData(null)
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

    //General Methods
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

    //Method for declaring constant and navigation
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