import React, { Component, useState, useCallback } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon, ButtonGroup, Button, Layout, Text, Modal, Card, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
/*
PROPS: onChangeDate : Methode demandant la nouvelle date
      action : methode demandant "soustraction" ou "addittion" a faire sur la date
      date : date actuelle
      index : index du radio buttons
      changeIndesx :  methode pour le changement d'index du radio buttons
       
RETURN: un graphique contenant toutes les infos
*/

export function TimeGroup(props) {

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        
        let currentDate = selectedDate?(new Date(selectedDate)):(props.date)
        setShow(Platform.OS === 'ios');
        currentDate.setDate(currentDate.getDate()+1)
        props.onChange(currentDate);

    };
 
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    const showPicker = useCallback((value) => setShow(value), []);
    const onValueChange = useCallback(
        (event, newDate) => {
            console.log(newDate)
            const selectedDate = new Date(newDate);
            selectedDate.setMonth(selectedDate.getMonth() + 1)

            showPicker(false);
            setDate(selectedDate);
            props.onChange(selectedDate.toISOString().split('T')[0].match(/(^[0-9 -]{5})\w+/)[0])
        },
        [date, showPicker],
    );

    const rightIcon = (props) => (
        <Icon {...props} name='arrow-forward-outline' />
    );
    const leftIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );

   const handleDateAction = (operation) => {
        let date = props.date
        
        if (props.type === "Month") {
            (operation === "addition" ? date.setYear(date.getFullYear() + 1) : date.setYear(date.getFullYear() - 1));
            
        }

        if (props.type === "Day") {
            (operation === "addition" ? date.setMonth(date.getMonth() + 1) : date.setMonth(date.getMonth() - 1));
            
        }

        if ( props.type === "Brut" || props.type === "Hour") {
            (operation === "addition" ? date.setDate(date.getDate() + 1) : date.setDate(date.getDate() - 1));
            
        }
        props.onChange(date)
    }

    return (

        <View>
            <ButtonGroup>
                <Button key={"minus"} onPress={() => handleDateAction("soustraction")} accessoryLeft={leftIcon} />
                <Button key={"calend"} onPress={showDatepicker} >{props.date.toISOString().split('T')[0]}</Button>
                <Button key={"maximus"} onPress={() => handleDateAction("addition")} accessoryLeft={rightIcon} />
            </ButtonGroup>
            
            {((show && props.type === "Brut")||(show && props.type === "Hour")) && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={props.date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            {(show && props.type === "Day") && (<Text>Monthly</Text>)}
            {(show && props.type === "Month") && (<Text>Year</Text>)}
        </View>
    );
}

/**
 * 
            

            {
 */