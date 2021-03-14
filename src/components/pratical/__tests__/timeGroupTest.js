
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, {useState} from 'react';
import {TimeGroup} from '../timeGroup'
import RadioButton from '../radioButton'
import {  ApplicationProvider,Icon, ButtonGroup, Button, Layout, Text,Modal, Card, TopNavigation, TopNavigationAction, RangeDatepicker, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

jest.useFakeTimers()

test('Testing display', async () => {
    const {getByText} = render(
       <TimeTest/>
    );
    expect(getByText("2020")).toBeDefined()
    })

test('Testing soustract date', async () => {
    const {getByText, getByTestId}  = render(
       <TimeTest/>
    );
    await act( async () => {
       const button = getByTestId('button')
       fireEvent.press(button)}
      );
      expect(getByText("p2020")).toBeDefined()
    })


//Putting some context for the components to be tested correctly
function TimeTest(){
    this.data= "2020"
    const [choice, setchoice] = useState("Month");
    const [date, setdate] = useState(new Date("2020-01-01"));
    const change = (val) => {
        setdate(val)
        this.data = val.getFullYear()
    }
        
    
    return(
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <IconRegistry icons={EvaIconsPack} />
          <Text testID={"choice"}>{choice}</Text>
          <Text>{"p" + this.data}</Text>
          <RadioButton data={[{ label: "Brut", value: "Brut" }, { label: "Hourly", value: "Hour" }, { label: "Daily", value: "Day" }, { label: "Monthly", value: "Month" }]} setValue={setchoice} ></RadioButton>
          <TimeGroup type={choice} date={date} onChange={change}/>
      </ApplicationProvider>
    );
  }