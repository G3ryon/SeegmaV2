import React, { Component, useCallback } from 'react';
import {SafeAreaView} from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingGraph } from '../../api/api.js';
import { TokenContext } from '../general/context';
import { useFocusEffect } from '@react-navigation/native';
import { gettingGraphInfo } from '../../api/api.js';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view for the choices of graphs to be displayed
*/

class Graph extends Component {
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
    static contextType = TokenContext;

    //Life Cycle
    componentDidMount() {
        gettingGraph(this.context.token)
            .then(response => {
                if (response["success"] === 0) {

                }
                else {
                    let data = response["data"]
                    let reformatedData = this.dataProcessing(data)
                    this.setState({ data: reformatedData, brutData: data, site: this.context.site });
                }
            })
    }



    //Methods for basic state update
    //function to change the site and redirect to the dashboard
    handleTilePress(id) {
        this.props.navigation.navigate('Graph', { graphId: id})
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
        this.setState({ data: reformatedData, brutData: data, site: this.context.site });
    }

    //General Methods
    //function to format the json received from backend
    dataProcessing(data) {
        if (data.length === 0) {
            let reformatedData = [{ separator: true, title: "Site : " + this.context.siteName }, { separator: true, title: "You only have the default graph" }]
            return reformatedData
        } else {
            let reformatedData = [{ separator: true, title: "Site : " + this.context.siteName }, { separator: true, title: 'Your favorite graphs' }]
            let favorite = []
            let nonFavorite = [{ title: 'Default graph', id: 0, icon: '', buttonIcon: '', fav: false }]

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

            reformatedData.push({ separator: true, title: '' });
            this.setState({ favorite: favorite, nonFavorite: nonFavorite })
            return reformatedData
        }
    }
    //Method to update the data from api
    OnFocus({props}) {
        useFocusEffect(
            useCallback(() => {
                if(props.context.site !== props.state.site){
                    props.componentDidMount()
                }
                // Do something when the screen is focused
                return () => {
                    // Do something when the screen is unfocused
                    // Useful for cleanup functions
                };
                
            }, [props]))
        return null
        
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
               <this.OnFocus props={this} ></this.OnFocus>
                
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