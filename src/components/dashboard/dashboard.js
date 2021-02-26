import React, { Component } from 'react';
import { View} from 'react-native';
import { IndexPath, Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import TilesView from '../pratical/tilesView';
import SelectComp from '../pratical/select';
import { gettingSiteData } from '../../api/api.js';
/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
        other.site      : Id of the site currently selected
        other.setSite   : method to set the selected site
        other.userId    : Id of the current user
        other.setUserId : method to set the user id
        handleWidget    : method to set the variable with the data of the selected widget
        widgetData      : variable containing the data of the current selected widget
        site            : variable containing the data of the current selected site
       
RETURN: a view of the widget for a selected dashboard
*/

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: new IndexPath(0),
            dataSelect: [],

        }
        this.handleSelect = this.handleSelect.bind(this);
        this.handleIconPress = this.handleIconPress.bind(this);
        const icons = {
            data: "file-text-outline",
            chart: "bar-chart",
            gauge: "compass-outline",
            widget: "cube"
        }
        this.icons = icons
    }

    //Methods for basic state update
    handleSelect(event) {
        this.setState({ selectedIndex: event })
    }

    //handle the preparation to see the widget
    handleIconPress(id) {
        let data = null
        this.state.data.forEach(element => {
            if (element["id"] == id) {
                data = element
            }
        });
        this.props.handlewidget(data)
        this.props.navigation.navigate('widget')
    }

    //Methods immplicating the life cycle
    //Initialisation of the data to be displayed
    componentDidMount() {
        this.props.handlewidget(null)
        gettingSiteData(this.props.other.authToken, this.props.other.userId, this.props.other.site)
            .then(response => {
                if (response["success"] === 0) {
                }
                else {
                    let data = response["data"]
                    let selectData = this.selectProcessing(data)
                    let reformatedData = this.dataProcessing(data[0]["data"])
                    this.setState({ dataSelect: selectData, data: reformatedData, brutData: data });
                }
            })
    }
    //Update the displayed widget in case of the change of the selected option
    componentDidUpdate(prevprops, prevstate) {
        if (prevstate.selectedIndex !== this.state.selectedIndex) {
            let reformatedData = this.dataProcessing(this.state.brutData[this.state.selectedIndex.row]["data"])
            this.setState({ data: reformatedData });
        }
    }

    //General Methods
    //function to format the data of the choosen option
    dataProcessing(data) {

        if (data.length === 0) {
            let reformatedData = [{ separator: true, title: "You don't have any widgets" }]
            return reformatedData
        } else {
            let reformatedData = [{ separator: true, title: "Actual site : " + this.props.site["site"] }]

            data.forEach(element => {
                let icon = this.icons[element["type"]]

                reformatedData.push({
                    title: element["name"],
                    id: element["id"],
                    buttonIcon: 'chevron-right',
                    icon: icon,
                })
            });
            reformatedData.push({ separator: true, title: '' });
            return reformatedData
        }
    }

    //method to extract the value for the options
    selectProcessing(data) {
        if (data.length === 0) {
            return []
        } else {
            let selectData = []

            data.forEach(element => {
                selectData.push(element.name)
            });
            return selectData
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
            <View>
                <TilesView itemData={this.state.data}
                    pressTile={this.handleIconPress}
                    pressIcon={this.handleIconPress}
                    headerComp={<TopNavigation
                        title={<SelectComp selectedIndex={this.state.selectedIndex} data={this.state.dataSelect} handleSelect={this.handleSelect} />}
                        accessoryLeft={this.backAction}
                        accessoryRight={this.notifAction}
                    />}
                />
            </View>)
    }
}
export default Dashboard;
