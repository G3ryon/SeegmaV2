import { ApplicationProvider, Layout, Button, Text, IndexPath } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { act } from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import 'react-native';
import React, { useState } from 'react';
import Chart from '../../pratical/charts'


//Test 
jest.useFakeTimers()

it('renders correctly the chart', async () => {
    const result = render(<ChartsTest/>)
    await act(async () => {expect(result).toMatchSnapshot();})
  });


//Putting some context for the components to be tested correctly
function ChartsTest() {
    const data = [["1/1/2011", "Eaux usées", 663], ["1/1/2011", "Eaux", 900], ["1/1/2011", "Eaux propres", 768], ["1/2/2011", "Eaux usées", 798], ["1/2/2011", "Eaux", 251], ["1/2/2011", "Eaux propres", 253], ["1/3/2011", "Eaux usées", 738], ["1/3/2011", "Eaux", 740], ["1/3/2011", "Eaux propres", 617]]
    const format = [{
        "name": "Time",
        "type": "date",
        "format": "%-m/%-d/%Y"
      }, {
        "name": "Type",
        "type": "string"
      }, {
        "name": "Consumption",
        "type": "number"
      }
      ]
    return (
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <Chart graphType={"column"} 
                   title={"TEST"} 
                   unit={"UNIT"} 
                   yTitle={"YTITLE"} 
                   data={data} 
                   format={format} >
            </Chart>
        </ApplicationProvider>
    )
}