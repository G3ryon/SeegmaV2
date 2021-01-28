import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, {useState} from 'react';
import Modal from '../../components/pratical/modal.js';

jest.useFakeTimers()

test('Testing modal appearance', async () => {
    const {getByText} = render(
       <ModalTest/>
    );
    await act( async () => {
       const button = getByText('display')
       fireEvent.press(button)}
      );
    expect(getByText('TestingModal')).toBeDefined()
    console.log(expect(getByText('TestingModal')).toBeDefined())
    })

test('Testing modal vanishing by button', async () => {
    const {getByText, queryByText} = render(
       <ModalTest/>
    );
    await act( async () => {
       const button = getByText('display')
       fireEvent.press(button)}
      );
    await act( async () => {
       const button = getByText('dissmis')
       fireEvent.press(button)}
      );  
    expect(queryByText('TestingModal')).toBeNull()
    })

/*test('Testing modal vanishing by backdrop', async () => {
    const {getByText, queryByText} = render(
       <ModalTest/>
    );
    await act( async () => {
        const button = getByText('display')
        fireEvent.press(button)}
       );
    await act( async () => {
       const text = getByText('backdrop')
       fireEvent.click(text)}
      );
     
    expect(queryByText('TestingModal')).toBeNull()
    })*/

//Putting some context for the components to be tested correctly
function ModalTest(){
    const [visible, setVisible] = useState("");
  
    return(
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Button onPress={() => console.log("dd")}>backdrop</Button>
            <Button onPress={() => setVisible(true)}>display</Button>
            <Modal visible={visible} onVisibility={setVisible} infos={<Text>TestingModal</Text>} exitText={"dissmis"} admitBackdrop={true} admitButton={true}/>
      </ApplicationProvider>
    );
  }