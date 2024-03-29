import React, { Component } from 'react';
import { SafeAreaView} from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingSite } from '../../api/api.js';
import { TokenContext } from '../general/context';
/*
route : 
props : setError : method to display message need a bool and a string 
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
    static contextType = TokenContext;
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
        this.context.handleSite(id,siteData['site'])
        this.props.navigation.navigate('bottomNav',{screen:"Dashboard", params: {screen:"Dashboard", params:{id:id,name:siteData['site']}}})
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
        
        this.context.handleSite(null,null)
        gettingSite(this.context.token)
            .then(response => {
                if (response["status"] == "error" || response["status"] == "fail") {
                    this.props.setError(true,response["message"])
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
            //in case there is no site for the user
            let reformatedData = [{ separator: true, title: "You don't have any site" }]
            return reformatedData
        } else {
            //formating the data to be displayed inside the tiles
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
                <TilesView testID={"selection_Site"} itemData={this.state.data}
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