import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, ButtonGroup, Layout } from '@ui-kitten/components';
import { default as theme } from '../../../theme.json';

export default RadioButton = (props) => {

    const [selected, setIndex] = React.useState(0);
    
    let index = 0
    React.useEffect(() => {
        console.log(props.value)
        if(props.value !== undefined){
            props.data.forEach(element => {
                if(element.value == props.value){
                    setIndex(index)
                }
                index +=1 
            });
        }
      });
    
    
    return (
        <Layout style={styles.container} level='1'>

            <ButtonGroup status="basic" appearance="outline" >

                {props.data.map((element,index )=> <Button
                    textStyle={selected == index ? { color: "white" } : null}
                    style={selected == index ? styles.buttonSelected : null}
                    onPress={() => {props.setValue(element.value); setIndex(index);}}
                    key={index}
                >{element.label}</Button>)}

            </ButtonGroup>


        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme["color-basic-200"],
    },
    text: {
        marginHorizontal: 8,
    },
    buttonSelected:{
        backgroundColor: theme["color-primary-900"]
    }
});