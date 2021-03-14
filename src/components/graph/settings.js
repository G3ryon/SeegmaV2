import React,{useState} from 'react';
import { StyleSheet,View } from 'react-native';
import { Button, Text} from '@ui-kitten/components';
import { default as theme } from '../../../theme.json';
import RadioButton from '../pratical/radioButton';
import DatumPicker from "../pratical/datumPicker";
/**
 * Props : apply : method to apply all the modifications
 */

export default Settings = (props) => {
    const [value, setValue] = useState("Brut")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [showStart, setShowStart] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
    const [error, setError] = useState("")

    //Method to update the start and end date
    const startDate= (date,bool) =>{
        setShowStart(bool)
        setStart(new Date(date))
    }

    const endDate = (date,bool) =>{
        setShowEnd(bool)
        setEnd(new Date(date))
    }

    //Method to update the date
    const onChange = (selectedDate, visibility, func) => {
        let currentDate = selectedDate ? (new Date(selectedDate)) : (props.date)
        //correction of the date error
        currentDate.setHours(currentDate.getHours() + 1)
        func(currentDate, visibility);
    };

    //method to handle the reformat of the date displayed
    const formatHandler = (date) =>{
        if(value === "Month"){
            return date.toISOString().split('T')[0].match(/(^[0-9 -]{5})\w+/)[0]
        }else if(value === "Day"){
            return date.toISOString().split('T')[0]
        }
        else{
            let hour = date.toISOString().split('T')[1].split('.')[0]
            return date.toISOString().split('T')[0] + ' ' + hour
        }
    }

    //Method to verify the date before submitting
    const verification = () => {
        if(start<end){
            props.apply(value,start,end);
        }else{
            setError("The interval is not correct")
        }
        
    }

    //data for the radio button
    const data = [{ label: "Brut", value: "Brut" }, { label: "Hourly", value: "Hour" }, { label: "Daily", value: "Day" },{ label: "Monthly", value: "Month" }]
    
    return (
        <View style={styles.modal}>
            <Text>Advanced Options</Text>
            <RadioButton data={data} setValue={setValue}></RadioButton>
            <Text>From: </Text><Button onPress={()=> setShowStart(true)}>{formatHandler(start)}</Button>
            <DatumPicker mode={'datepicker'} visible={showStart && value === "Brut"} onChange={(date,visibility)=>onChange(date,visibility,startDate)}/>
            <DatumPicker mode={'datepicker'} visible={showStart && value === "Hour"} onChange={(date,visibility)=>onChange(date,visibility,startDate)}/>
            <DatumPicker mode={'calendar'} visible={showStart && value === "Day"} onChange={(date,visibility)=>onChange(date,visibility,startDate)}/>
            <DatumPicker mode={'monthYear'} visible={showStart && value === "Month"} onChange={(date,visibility)=>onChange(date,visibility,startDate)}/>
            <Text>To: </Text><Button onPress={()=> setShowEnd(true)}>{formatHandler(end)}</Button>
            <DatumPicker mode={'datepicker'}  visible={showEnd && value === "Brut"} onChange={(date,visibility)=>onChange(date,visibility,endDate)}/>
            <DatumPicker mode={'datepicker'} visible={showEnd && value === "Hour"} onChange={(date,visibility)=>onChange(date,visibility,endDate)}/>
            <DatumPicker mode={'calendar'} visible={showEnd && value === "Day"} onChange={(date,visibility)=>onChange(date,visibility,endDate)}/>
            <DatumPicker mode={'monthYear'} visible={showEnd && value === "Month"} onChange={(date,visibility)=>onChange(date,visibility,endDate)}/>
            <Button onPress={()=>{props.apply("cancel")}} >Cancel</Button>
            <Button onPress={()=>{verification()}}>Done</Button>
            <Text status='danger'>{error}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    modal: {
        backgroundColor: theme["color-basic-300"],
        padding: 10,
      }
});