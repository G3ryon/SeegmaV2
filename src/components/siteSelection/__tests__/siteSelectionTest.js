import 'react-native';
import React, { useState } from 'react';

import { act } from 'react-test-renderer';

import {render } from '@testing-library/react-native';
import Home from '../home.js';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

jest.useFakeTimers()

test('Login renders correctly', async () => {

    const result = render(
      <SelectionViewTest authToken={"test"} userId={"test"} setSite={(val)=>{}}/>
    );
    await act(async () => {expect(result).toMatchSnapshot();})
  });

  function SelectionViewTest(props) {

    const [testValue0, handleNotification] = useState("noTileValue");
    const [testValue1, setSite] = useState("noIconValue");
    return (
      <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <Home {...props} other={props} setNotif={handleNotification} setSiteData={setSite}/>
      </ApplicationProvider>
      </>
    )
  }