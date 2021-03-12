import React from 'react';
import { StyleSheet,View } from 'react-native';
import { Button, ButtonGroup, Layout, Text, Modal } from '@ui-kitten/components';
import { default as theme } from '../../../theme.json';

import DatePicker from 'react-native-modern-datepicker';
/**
 * Props : mode : displaying mode
 *         visible : bool for the visibility 
 *         onChange : function to change the visible props and the date 
 */

export default DatumPicker = (props) => {

    const options = {
        backgroundColor: theme["color-basic-300"],
        textHeaderColor: theme["color-basic-800"],
        textDefaultColor: theme["color-basic-800"],
        selectedTextColor: theme["color-basic-100"],
        mainColor: theme["color-primary-900"],
        textSecondaryColor: theme["color-basic-800"],
        borderColor: theme["color-basic-800"],//color-basic-transparent-600
    }

    return (
        <Modal visible={props.visible} style={{ flex: 1, padding: 100 }} backdropStyle={styles.backdrop}>
            <View style={{
                width: 300,
                height: 400,
            }}>
                {props.mode == 'monthYear' ? (
                    <DatePicker
                        mode={props.mode}
                        
                        onMonthYearChange={date => { props.onChange(date.replace(' ','-'),false)}}
                        options={options}
                    />
                ) : (
                    <DatePicker
                        mode={props.mode}
                        
                        onSelectedChange={date => { props.onChange(date,false);console.log(date.replace(' ','-')) }}
                        options={options}
                    />
                )}

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }
});