import React, { Component, useState, useCallback } from 'react';
import { View, Platform } from 'react-native';
import DatumPicker from "../pratical/datumPicker";

import { Icon, ButtonGroup, Button, Layout, Text,Modal, Card, TopNavigation, TopNavigationAction, RangeDatepicker } from '@ui-kitten/components';
/*
PROPS: date : selected date
       type : the type of date : Brut,Hour,Day,Month 
       
RETURN: a datepicker and a date display with arrows
*/

export function TimeGroup(props) {

    const [show, setShow] = useState(false);

    // method to change the date by the one choosen
    const onChange = (selectedDate, visibility) => {

        setShow(visibility)
        let currentDate = selectedDate ? (new Date(selectedDate)) : (props.date)
        //correction of the date error
        currentDate.setDate(currentDate.getDate() + 1)
        props.onChange(currentDate);


    };

    //icons
    const rightIcon = (props) => (
        <Icon {...props} name='arrow-forward-outline' />
    );
    const leftIcon = (props) => (
        <Icon {...props} name='arrow-back-outline' />
    );
    
    //method to handle the arrows buttons
    const handleDateAction = (operation) => {
        let date = props.date

        if (props.type === "Month") {
            (operation === "addition" ? date.setYear(date.getFullYear() + 1) : date.setYear(date.getFullYear() - 1));
        }

        if (props.type === "Day") {
            (operation === "addition" ? date.setMonth(date.getMonth() + 1) : date.setMonth(date.getMonth() - 1));
        }

        if (props.type === "Brut" || props.type === "Hour") {
            (operation === "addition" ? date.setDate(date.getDate() + 1) : date.setDate(date.getDate() - 1));
        }
        props.onChange(date)
    }

    //method to handle the reformat of the date displayed
    const formatHandler = () =>{
        if(props.type === "Day"){
            return props.date.toISOString().split('T')[0].match(/(^[0-9 -]{5})\w+/)[0]
        }else if(props.type === "Month"){
            return props.date.getFullYear()
        }else{
            return props.date.toISOString().split('T')[0]
        }
    }

    return (

        <View>
            <ButtonGroup>
                <Button key={"minus"} onPress={() => handleDateAction("soustraction")} accessoryLeft={leftIcon} />
                <Button key={"calend"} onPress={()=>{if(props.type !== "Month"){setShow(true)}}} >{formatHandler()}</Button>
                <Button key={"maximus"} onPress={() => handleDateAction("addition")} accessoryLeft={rightIcon} />
            </ButtonGroup>

            {((show && props.type === "Brut") || (show && props.type === "Hour")) && (
                <DatumPicker mode={'calendar'} visible={show} onChange={onChange}/>
            )}

            {(show && props.type === "Day") && (
                <DatumPicker mode={'monthYear'} visible={show} onChange={onChange}/>
            )}


        </View>
    );
}

