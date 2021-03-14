import React, {Component} from 'react';
import { View, Image } from 'react-native';
import { Button, Icon, List, ListItem,Text } from '@ui-kitten/components';


/*
PROPS:  itemData : json with the data to be displayed and the places to put a seperator
        headerComp : component to be put as header
        choosenIcon : icon to be displayed as right button
        leftImage : boolean to display an image 
        pressTile : function when you press on the tile
        pressIcon : function when you press on the icon use as rigth accessory


       
RETURN: a flat list view of tiles with a sticky header
*/

export default class TilesView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handlePressTile = this.handlePressTile.bind(this)
        this.handlePressIcon = this.handlePressIcon.bind(this)
    }

    //handler to link the functions
    handlePressTile(id) {
      this.props.pressTile(id)
    }
    handlePressIcon(id) {
      this.props.pressIcon(id)
    } 

    //seperator between each tile
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

    //icon render 
    renderIcon = (props, iconName) =>{ 
      return(
        <Icon {...props} name={iconName}/>
    );}

    //button to be render in the right of the tile
    renderItemAccessory = (id, iconName) => (
      iconName ==''?(
        <Text></Text>
      ):(
      <Button
      testID={id}
      appearance='ghost'
      accessoryLeft={(props)=> this.renderIcon(props,iconName)}
      onPress={()=>{this.handlePressIcon(id)}}/>  )  
    );
    
    //Icon to be render in the left of the tile
    renderItemIconImg = (props,iconImg,bool) =>{ 
      
      return(
      bool?(
        iconImg ==''?(<Text></Text>):(<Icon {...props} name={iconImg}/>)
      ):(
        <Image style={{
        resizeMode: "contain",
        height: 48,
        width: 128}} 
        source={{uri: iconImg}}/>)
      )}
      
    componentDidMount(){
      let isDefined = false
      if(typeof this.props.pressTile === "function"){ isDefined = true}
      this.setState({isDefined:isDefined})
    }
      
    //render function for the tiles with the input datas
    //render in function of the input datas
    renderItem = ({ item}) =>{
    return( item.separator ?
    (
       <Text category='h6' style={{textAlign: 'center',}}>{`${item.title}`}</Text>
    ):(
      item.description?(
        <ListItem
          title={`${item.title}`}
          description={`${item.description}`}
          accessoryLeft={item.image?(props)=>this.renderItemIconImg(props,`${item.image}`,false):(props)=>this.renderItemIconImg(props,`${item.icon}`,true)}
          accessoryRight={()=>this.renderItemAccessory(`${item.id}`,`${item.buttonIcon}`)}
          onPress={()=>{if(this.state.isDefined){this.handlePressTile(`${item.id}`)}}}
        />
      ):(
          <ListItem
          title={`${item.title}`}
          accessoryLeft={item.image?(props)=>this.renderItemIconImg(props,`${item.image}`,false):(props)=>this.renderItemIconImg(props,`${item.icon}`,true)}
          accessoryRight={()=>this.renderItemAccessory(`${item.id}`,`${item.buttonIcon}`)}
          onPress={()=>{if(this.state.isDefined){this.handlePressTile(`${item.id}`)}}}
        />
      )
    ))}
    
    render(){
    return (
        <List
          data={this.props.itemData}
          renderItem={this.renderItem}
          stickyHeaderIndices={[0]}  
          ListHeaderComponent={this.props.headerComp}
          ItemSeparatorComponent = { this.FlatListItemSeparator }
        />
    );}

}