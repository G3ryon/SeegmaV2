import React, {Component,useState} from 'react';
import { View, Image, TextInput } from 'react-native';
import { Button, Layout, Text, Modal, Card } from '@ui-kitten/components';

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
    

