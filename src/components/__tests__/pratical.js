import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, {useState} from 'react';
import Input from '../pratical/input.js'

//Test 
jest.useFakeTimers()

test('Testing input component', async () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <InputTest/>
    );
    await act( async () => {fireEvent.changeText(
      getByPlaceholderText('Login'),
      'Test_Input')}
      );
    expect(getByDisplayValue('Test_Input')).toBeDefined()
  });
  

//Putting some context for the components to be tested correctly
function InputTest (){
  const [loginValue, setValue] = useState("");

  return(
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
          <Input type={"text"} required={true} readonly={false} value={loginValue} onChange={setValue} placeHolder={"Login"}/>
    </ApplicationProvider>
  )
}