import React, {Component} from 'react';
import { ScrollView, View} from 'react-native';
import { Button, Layout, Text,Icon, TopNavigation, TopNavigationAction  } from '@ui-kitten/components';
import PlainColumn2D from '../pratical/basicChart';
import ScrollCharts from '../pratical/scrollCharts';
import { gettingAlarmsList } from '../../api/api.js';
import { TokenContext } from '../general/context';
import Loading from '../general/loading'
/*
PROPS: 
       
RETURN: a view of the activation of the choosen alarm into a graph
*/
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

class Alarms_occ extends Component{
    constructor(props){
        super(props);
        this.state = {
            reformatedData:[],
            loading: true,
        }
    }
    static contextType = TokenContext;

    //Lifecycle methods
    componentDidMount(){
        gettingAlarmsList(this.context.token,this.context.site)
        .then(response => {
            if (response.success === 0) {
            }
            else {
                let data = response.data
                //this.dataProcessing(data)
                let category = []
                let reformatedData = []
                let actualYear = new Date().getFullYear()
                let actualMonth = new Date().getMonth() +1
                let firstYear = new Date(data[0].date).getFullYear()
                let firstMonth = new Date(data[0].date).getMonth() 
                let nbMonth = (actualYear-firstYear)*12- firstMonth +actualMonth
                let date = new Date(data[0].date)
                let i = 0
                for (let index = 0; index < nbMonth; index++) {
                    category.push({label : month[date.getMonth()] +" "+date.getFullYear()})
                    

                    data.forEach(element => {
                        if(date.getMonth() == new Date(element.date).getMonth()){
                            i +=1
                        }
                    });
                    reformatedData.push({value: i})
                    i = 0
                    date.setMonth(date.getMonth()+1)
                }
               this.setState({data: reformatedData, category: category, loading:false})
            }
        })
    }

    componentDidUpdate(prevprops){
        if(prevprops.route !== this.props.route){
            this.componentDidMount
        }
    }

    //Method for declaring constant and navigation
    //Icon constant
    backIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    //function to handle the buttons of the header
    backAction = () => (
        <TopNavigationAction icon={this.backIcon} onPress={() => this.props.navigation.goBack()} />
    );

    render(){
        if (this.state.loading) {
            return (
              <View>
                <Loading />
              </View>
            )
          }
          else {
        return(
        <ScrollView>
            <TopNavigation
                        title={<Text>{"Alarme : " + this.props.route.params['name']}</Text>}
                        accessoryLeft={this.backAction}
                    />
           <ScrollCharts data={this.state.data} category={this.state.category} title={"Activation of "+this.props.route.params['name'] +" by month"} yTitle={'Ocurrence'}  xTitle={'Time'}></ScrollCharts>
        </ScrollView>)}
    }
    
}
export default Alarms_occ;