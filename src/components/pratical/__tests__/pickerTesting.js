import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, { useState } from 'react';
import DatumPicker from '../datumPicker.js'

//Test 
jest.useFakeTimers()

test('Testing displaying calendar', async () => {
    const { getByTestId, getByText } = render(
        <PickerTest />
    );
    await act(async () => {
        const button = getByText('display')
        fireEvent.press(button)}
    );
    expect(getByTestId('calendar')).toBeDefined()
});

test('Testing displaying month year calendar', async () => {
    const {getByTestId,getByText } = render(
        <PickerTest />
    );
    await act(async () => {
        const button = getByText('mode')
        fireEvent.press(button)
        const buttonDisp = getByText('display')
        fireEvent.press(buttonDisp)}
    );
    expect(getByTestId('calendar')).toBeDefined()
});

//Putting some context for the components to be tested correctly
function PickerTest() {

    const [show, setShow] = useState(false);
    const [mode, setmode] = useState('calendar');
    const [date, setDate] = useState(new Date());
    const change = (date) => {
        setDate(new Date(date))
        setShow(false)
    }

    return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Text>{date.toISOString()}</Text>
            <Button onPress={() => setShow(true)}>display</Button>
            <Button onPress={() => setmode('monthYear')}>mode</Button>
            <DatumPicker mode={mode} visible={show} onChange={change}></DatumPicker>
        </ApplicationProvider>
    )
}