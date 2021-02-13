import React, { Component, useState } from 'react'
import { StyleSheet, Text, View,  ScrollView, Button, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DoneButton = (props) => {
    return (
        <Button title="Save Task"
                onPress={() => Alert.alert("Button Pressed")} 
                ></Button>
    );
}

const DateToMasterByPicker = (props) => {
    const date = new Date();
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        props.handler(currentDate);
    };


    return (
        <DateTimePicker 
            testID="dateTimePicker" 
            value={props.masterByDate} mode={'date'} is24Hour={true} display="default" onChange={onChange} />
    );
}

class AddStudyTask extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.state = {
            subject: '',
            description: '',
            dateToMasterBy: new Date(),
            preferredStudyInterval: 5
        };
    }

    

    // constructor onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || dateToMasterBy

    // }
    handler(date) {
        this.setState((state, props) => {
            return {dateToMasterBy: date}
        }, () => {
            console.log(this.state.dateToMasterBy);
        });
        // console.log(date);
    }

    render () {

        return (
            <View>
                <Text>Study Task Details</Text>
                <TextInput style={
                    styles.inputStyle} placeholder="Subject"/>
                <TextInput style={styles.inputStyle} placeholder="Description"/>
                <DoneButton />
                <Text>Tap here to choose when you want to master this subject by: </Text>
                <DateToMasterByPicker handler={this.handler} masterByDate={this.state.dateToMasterBy} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 40, 
        borderWidth: 1, 
        borderColor: 'black',
        marginBottom: 10,
        textAlign: 'center'
    },
  });


export default AddStudyTask;