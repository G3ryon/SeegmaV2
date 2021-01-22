import 'react-native';
import React from 'react';
import App from '../App';
import { act } from 'react-test-renderer';
import { clearUpdateCacheExperimentalAsync } from 'expo-updates';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Login from '../page/non-auth/login.js';
import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

jest.useFakeTimers()

it('renders correctly App', async () => {
  const result = render(<App/>)
  await act(async () => {expect(result).toMatchSnapshot();})
});


test('Login input works correctly', async () => {
  const { getByPlaceholderText, getByText, getAllByText, queryByText, getByDisplayValue } = render(
    <ApplicationProvider mapping={mapping} theme={lightTheme}><Login /></ApplicationProvider>
  );
  await act( async () => {fireEvent.changeText(
    getByPlaceholderText('Login'),
    'Test_Login')}
    );
  expect(getByDisplayValue('Test_Login')).toBeDefined()
});

test('Password input works correctly', async () => {
  const { getByPlaceholderText, getByText, getAllByText, queryByText, getByDisplayValue } = render(
    <ApplicationProvider mapping={mapping} theme={lightTheme}><Login /></ApplicationProvider>
  );
  await act( async () => {fireEvent.changeText(
    getByPlaceholderText('Password'),
    'Test_Pass')}
    );
  expect(getByDisplayValue('Test_Pass')).toBeDefined()
});