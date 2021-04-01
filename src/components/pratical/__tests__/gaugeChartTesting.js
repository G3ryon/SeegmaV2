import { ApplicationProvider, Layout, Button, Text, IndexPath } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import 'react-native';
import React, { useState } from 'react';
import WidgetGauge from '../widgetGauge'


//Test 
jest.useFakeTimers()

it('renders correctly the Gauge', async () => {
    const result = render(<GaugeChartsTest/>)
    await act(async () => {expect(result).toMatchSnapshot();})
  });


//Putting some context for the components to be tested correctly
function GaugeChartsTest() {
    
    return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <WidgetGauge graphType={"thermometer"} title={"TEST"} max={"100"} min={"10"} unit={"1"} color={[]} value={'65'} target={[]} />
        </ApplicationProvider>
    )
}