import { ApplicationProvider, Layout, Button, Text, TopNavigation, TopNavigationAction, IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, { useState } from 'react';
import Input from '../input.js'
import Modal from '../modal.js';
import TilesView from '../tilesView.js';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

//Test 
jest.useFakeTimers()

test('Testing tiles view component', async () => {
  const {getByText} = render(
    <TilesViewTest />
  );
  expect(getByText('site')).toBeDefined()
});


test('Testing button tiles', async () => {
  const { getByText } = render(
    <TilesViewTest />
  );
  await act(async () => {
    const button = getByText('site')
    fireEvent.press(button)
  }
  );
  expect(getByText('12345')).toBeDefined()
})
test('Testing button icon', async () => {
  const { getByText,getByTestId} = render(
    <TilesViewTest />
  );
  await act(async () => {
    const button = getByTestId('12345s')
    fireEvent.press(button)
  }
  );
  expect(getByText('12345s')).toBeDefined()
})

//Putting some context for the components to be tested correctly
function TilesViewTest() {
  const data = [
  {
    title: "site",
    id: "12345",
    buttonIcon: 'star',
    image: 'https://i.ibb.co/hM8Gx4m/logo-seegma.png',

  },
  {
    title: "sites",
    id: "12345s",
    buttonIcon: 'star',
    description:"tested",
    icon: 'star'

  }
  ]
  const [tileValue, handleTilePress] = useState("noTileValue");
  const [iconValue, handleIconPress] = useState("noIconValue");
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <Text>{tileValue}</Text>
      <Text>{iconValue}</Text>
      <TilesView
        itemData={data}
        pressTile={handleTilePress}
        pressIcon={handleIconPress}
        headerComp={<Text>dzsqedfs</Text>}
      />
    </ApplicationProvider>
    </>
  )
}