import React, { Component } from 'react';
import { View, Image, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { Icon, Button, Layout, Text, Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingGraph} from '../../api/api.js';
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
            data: null,
            favorite: null,
            nonFavorite: null,
        }
        this.handleTilePress = this.handleTilePress.bind(this);
        this.handleIconPress = this.handleIconPress.bind(this);
    }
    static contextType = TokenContext;
    componentDidMount(){
        gettingGraph(this.context.token)
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

    //Methods for basic state update
    //function to change the site and redirect to the dashboard
    handleTilePress(id) {
        this.props.navigation.navigate('Graph',{graphId: id})
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

    //General Methods
    //function to format the json received from backend
    dataProcessing(data) {
        if (data.length === 0) {
            let reformatedData = [{ separator: true, title: "Site : "+ this.context.siteName },{ separator: true, title: "You only have the default graph"}]
            return reformatedData
        } else {
            let reformatedData = [{ separator: true, title: "Site : "+ this.context.siteName },{ separator: true, title: 'Your favorite graphs' }]
            let favorite = []
            let nonFavorite = [{ title: 'Default graph', id: 0, icon:'', buttonIcon: '', fav: false }]

            data.forEach(element => {
                if (element["favorite"]) {
                    favorite.push({
                        title: element["graph"],
                        id: element["id"],
                        buttonIcon: 'star',
                        icon: '',

                    })
                }
                nonFavorite.push({
                    title: element["graph"],
                    id: element["id"],
                    buttonIcon: 'star',
                    icon: '',
                    fav: element["favorite"]
                })

            });

            reformatedData = reformatedData.concat(favorite);
            reformatedData.push({ separator: true, title: 'Your graphs' });
            reformatedData = reformatedData.concat(nonFavorite);
            
            reformatedData.push({ separator: true, title: '' });console.log(reformatedData)
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

    render(){
        return (
            <SafeAreaView>
                <TilesView itemData={this.state.data}
                    pressTile={this.handleTilePress}
                    pressIcon={this.handleIconPress}
                    headerComp={<TopNavigation
                        title="Graph listing"
                        accessoryLeft={this.backAction}
                        accessoryRight={this.notifAction}
                    />}
                />
            </SafeAreaView>)
    }
    
}
export default Graph;