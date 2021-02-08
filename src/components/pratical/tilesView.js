import React, {Component} from 'react';
import { View, Image, TextInput, ScrollView, SafeAreaView,FlatList } from 'react-native';
import { Button, Icon, List, ListItem,Text } from '@ui-kitten/components';


export default class TilesView extends Component {
    constructor(props) {
        super(props);
        
    }
    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
      }

    renderItemAccessory = (index) => (
        <Button size='tiny' onPress={()=>{console.log(index)}}>FOLLOW</Button>
    );

    renderItemIcon = (props) => (
        <Icon {...props} name='person'/>
    );
    
    renderItem = ({ item, index }) => item.separator ?(
        <Text>fdghosqtdh</Text>
    ):(
        <ListItem

          title={`${item.title} ${index + 1}`}
          description={`${item.description} ${index + 1}`}
          accessoryLeft={this.renderItemIcon}
          accessoryRight={()=>this.renderItemAccessory(`${index + 1}`)}
          onPress={()=>{console.log({index})}}
        />
    );
    
    render(){
    return (
        <List
          data={this.props.itemData}
          renderItem={this.renderItem}
          stickyHeaderIndices={[0]} 
          ListHeaderComponent={this.props.Header}
          ItemSeparatorComponent = { this.FlatListItemSeparator }
        />
    );}

}