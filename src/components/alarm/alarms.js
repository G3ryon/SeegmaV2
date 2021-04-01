import React, { Component, useCallback  } from 'react';
import { View} from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingUserAlarms } from '../../api/api.js';
import { TokenContext } from '../general/context';
import { useFocusEffect } from '@react-navigation/native';

/*
Route :
       
RETURN: a view of the alarms of the user
*/

class Alarms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : null,
            msg: "test",
            visibility: false,
        }
        this.handleIconPress = this.handleIconPress.bind(this);
    }
    static contextType = TokenContext;
    

    //Methods immplicating the life cycle
    //Initialisation of the data to be displayed
    componentDidMount() {
        //this.props.setAlarm(null)
        gettingUserAlarms(this.context.token,this.context.site)
            .then(response => {
                if (response["status"] == "error" || response["status"] == "fail") {
                    this.props.setError(true,response["message"])
                }
                else {
                    let data = response["data"]
                    let reformatedData = this.dataProcessing(data)
                    this.setState({data: reformatedData, brutData: data, site: this.context.site  });
                }
            })
    }

    //General Methods
    //handle the preparation to see the widget
    handleIconPress(id) {
        this.state.brutData.forEach(element => {
            if (element["id"] == id) {
                this.props.navigation.navigate('Alarms info',element)
            }
        });
        
    }
    //function to format the data of the choosen option
    dataProcessing(data) {
        if (data.length === 0) {
            //First tile with the title
            let reformatedData = [{ separator: true, title: "You don't have any alarms" }]
            return reformatedData
        } else {
            let reformatedData = [{ separator: true, title: "" }]
            //Buildiing the tiles with the data fetch
            data.forEach(element => {
                if (element["status"]) {
                    reformatedData.push({
                        title: element["name"],
                        id: element["id"],
                        buttonIcon: 'chevron-right',
                        description: element['description'],
                        icon: 'alert-triangle',
                    })
                } else {
                    reformatedData.push({
                        title: element["name"],
                        id: element["id"],
                        buttonIcon: 'chevron-right',
                        description: element['description'],
                        icon: '',
                    })
                }


            });
            reformatedData.push({ separator: true, title: '' });
            return reformatedData
        }
    }
    //function to recall the api
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
            <View>
                <this.OnFocus props={this} ></this.OnFocus>
                <TilesView itemData={this.state.data}
                    pressTile={this.handleIconPress}
                    pressIcon={this.handleIconPress}
                    headerComp={<TopNavigation
                        title="Alarms"
                        accessoryLeft={this.backAction}
                        accessoryRight={this.notifAction}
                    />}
                />
           </View>)
    }

}
export default Alarms;