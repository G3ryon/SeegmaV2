import { ApplicationProvider, Layout, Button, Text, IndexPath } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, { useState } from 'react';
import ScrollCharts from '../scrollCharts'


//Test 
jest.useFakeTimers()

it('renders correctly the scrollchart', async () => {
    const result = render(<ScrollChartsTest/>)
    await act(async () => {expect(result).toMatchSnapshot();})
  });


//Putting some context for the components to be tested correctly
function ScrollChartsTest() {
    const data =[{"value": 1}, {"value": 1}, {"value": 0}, {"value": 0}, {"value": 0}, {"value": 1}, {"value": 0}, {"value": 1}, {"value": 1}, {"value": 1}, {"value": 2}]
    const format = [{"label": "May 2020"}, {"label": "June 2020"}, {"label": "July 2020"}, {"label": "August 2020"}, {"label": "September 2020"}, {"label": "October 2020"}, {"label": "November 2020"}, {"label": "December 2020"}, {"label": "January 2021"}, {"label": "February 2021"}, {"label": "March 2021"}]
      
    return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <ScrollCharts 
            data={data} 
            category={format} 
            title={"TEST"} 
            yTitle={'Ocurrence'} 
            xTitle={'Time'}></ScrollCharts>
        </ApplicationProvider>
    )
}