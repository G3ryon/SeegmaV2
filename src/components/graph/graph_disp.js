import React, {Component,useState} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text, Modal, Card } from '@ui-kitten/components';

/*
PROPS:  other.isSignIn  : bool displaying if the user is authenticated
        other.signIn    : method to set the isSignIn
        other.authToken : string with the token of the user
        other.setAuth   : method to set the authToken
       
RETURN: a view of the graph with the data set choosen, there is also the modal for the settings
*/

export const Graph_disp = () =>{
    
    const [visible, setVisible] = useState(false);

    return(
        <View>
           <Button onPress={() => setVisible(true)}>
        MODAL
      </Button>
      <Modal visible={visible}>
          <Card>
          <Text>GRAPHE</Text>
          <Button onPress={() => setVisible(false)}>
            DISMISS
          </Button>
            </Card>  
      </Modal>
        </View>)
    }
    

