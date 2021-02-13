import React, { Component } from 'react'
import { StyleSheet, Text, View,  ScrollView, Button, TextInput } from 'react-native';

class AddStudyTask extends Component {
    render () {
        return (
            <View>
                <Text>Task information</Text>
                <TextInput style={
                    styles.inputStyle} placeholder="Subject"/>
                <TextInput style={styles.inputStyle} placeholder="Description"/>
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