import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, {useState} from 'react';
import RadioButton from '../radioButton'

jest.useFakeTimers()

test('Testing ', async () => {
    const {getByText} = render(
       <RadioTest/>
    );
    await act( async () => {
       const button = getByText('Hourly')
       fireEvent.press(button)}
      );
    expect(getByText('Hour')).toBeDefined()
    })

//Putting some context for the components to be tested correctly
function RadioTest(){
    const [choice, setchoice] = useState("Brut");
  
    return(
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <Text testID={"choice"}>{choice}</Text>
          <RadioButton data={[{ label: "Brut", value: "Brut" }, { label: "Hourly", value: "Hour" }, { label: "Daily", value: "Day" }, { label: "Monthly", value: "Month" }]} setValue={setchoice} ></RadioButton>
      </ApplicationProvider>
    );
  }