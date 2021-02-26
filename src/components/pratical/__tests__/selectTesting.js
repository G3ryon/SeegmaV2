import { ApplicationProvider, Layout, Button, Text, IndexPath } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, { useState } from 'react';
import SelectComp from '../select.js'


//Test 
jest.useFakeTimers()

test('Select component works', async () => {
    const { getByPlaceholderText, getByTestId, getByDisplayValue, getByText } = render(
        <SelectTest />
    );
    await act(async () => {
    }
    );
    expect(getByText('Test1')).toBeDefined()
});

test('Selecting the second options from the select', async () => {
    const { getByPlaceholderText, getByTestId, getByDisplayValue, getByText } = render(
        <SelectTest />
    );
    await act(async () => {
        fireEvent(getByText('Test1'),'onSelect',new IndexPath(1))  
    }
    );
    expect(getByText('Test2')).toBeDefined()
});



//Putting some context for the components to be tested correctly
function SelectTest() {
    const [indexValue, setIndex] = useState(new IndexPath(0));
    const data = ["Test1", "Test2", "Test3"]
    return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <SelectComp data={data} selectedIndex={indexValue} handleSelect={setIndex} />
        </ApplicationProvider>
    )
}