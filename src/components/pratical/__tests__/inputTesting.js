import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, {useState} from 'react';
import Input from '../input.js'
import Modal from '../modal.js';

//Test 
jest.useFakeTimers()

test('Testing input component', async () => {
    const { getByPlaceholderText, getByDisplayValue, getByText } = render(
      <InputTest/>
    );
    await act( async () => {
      fireEvent.changeText(getByPlaceholderText("Log"),'Test_Input');

  }
      );
    expect(getByDisplayValue('Test_Input')).toBeDefined()
  });
  


//Putting some context for the components to be tested correctly
function InputTest (){
  const [loginValue, setValue] = useState("");
  const [pattern, setPattern] = useState([
    '^.{8,}$', // min 8 chars
    '(?=.*\\d)', // number required
    '(?=.*[A-Z])', // uppercase letter
  ]);
  return(
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
          
          <Input type={"text"} required={true} readonly={false} pattern={pattern} value={loginValue} onChange={setValue} placeholder={"Log"}/>
    </ApplicationProvider>
  )
}

