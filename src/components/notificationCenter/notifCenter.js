import React, { Component } from 'react';
import { View} from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import { gettingNotifications } from '../../api/api.js';
import { TokenContext } from '../general/context';
/*
Route : name : Name of the route
        params : data linked to the route

RETURN: a view of the list of notification for the user
*/

class Notif_center extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
        this.handleIconPress = this.handleIconPress.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleIconPress = this.handleIconPress.bind(this);
        const icons = {
            alarm: "bell-outline",
            report: "file-text-outline",
            group: "people-outline",
        }
        this.icons = icons
    }
    static contextType = TokenContext;

    //handle the preparation to see the details of the notiication
    handleIconPress(id) {
        this.state.brutData.forEach(element => {
            if(element['id'] == id){
                this.props.navigation.navigate('Notification',element)
            }
        });
    }

    handleDelete() {
        this.setState({ data: null })
        //call api to delete the notification data
        this.props.navigation.goBack()
    }

    //function to format the json received from backend
    dataProcessing(data) {
        if (data.length === 0) {
            let reformatedData = [{ separator: true, title: "You don't have any notifications" }]
            return reformatedData
        } else {
            let reformatedData = [{ separator: true, title: '' }]

            data.forEach(element => {
                let icon = this.icons[element["type"]]
                
                reformatedData.push({
                    title: element["name"] + "\n" + element['date'].slice(0,21),
                    id: element["id"],
                    buttonIcon: 'question-mark-circle-outline',
                    description: element["description"],
                    icon: icon,
                })
            });
            reformatedData.push({ separator: true, title: '' });
            return reformatedData
        }
    }

    //function to initialize all the data to display
    componentDidMount() {
        gettingNotifications(this.context.token)
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

    //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    notifIcon = (props) => (
        <Icon {...props} name='trash-2-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
    );
    notifAction = () => (
        <TopNavigationAction icon={this.notifIcon} onPress={() => this.handleDelete()} />
    );

    render() {
        if(this.state.data ===null)
        {
            this.componentDidMount()
        }

        return (
            <View>
                <TilesView itemData={this.state.data}
                    pressIcon={this.handleIconPress}
                    headerComp={<TopNavigation
                        title="Notification center"
                        accessoryLeft={this.backAction}
                        accessoryRight={this.notifAction}
                    />}
                />
            </View>)
    }
}
export default Notif_center;
/*const data = [
    {
        title: "alarm1  \n11/02/2021 15:56",
        id: "12345678s",
        buttonIcon: 'question-mark-circle-outline',
        description: 'Comsuption excede for home desktop',
        icon: 'bell-outline'
    },
    {
        title: "Group \n11/02/2021 15:56",
        id: "12345678s",
        buttonIcon: 'question-mark-circle-outline',
        description: 'You have been added to a new site',
        icon: 'people-outline'
    },
    {
        title: "Report \n11/02/2021 15:56",
        id: "12345678s",
        buttonIcon: 'question-mark-circle-outline',
        description: 'You have been added to a new site',
        icon: 'file-text-outline'
    }
]*/