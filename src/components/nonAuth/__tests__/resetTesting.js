import 'react-native';
import React from 'react';

import { act } from 'react-test-renderer';

import { fireEvent, render, waitFor } from '@testing-library/react-native';
import Reset from '../reset.js';
import { ApplicationProvider, Layout, Button, Text } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';

// Note: test renderer must be required after react-native.
//import renderer from 'react-test-renderer';

jest.useFakeTimers()

test('Reset renders correctly', async () => {
    const result = render(
      <ApplicationProvider mapping={mapping} theme={lightTheme}><Reset /></ApplicationProvider>
    );
    await act(async () => {expect(result).toMatchSnapshot();})
  });