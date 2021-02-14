import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const DoneButton = (props) => {
    return (
        <Button title="Save Task"
                onPress={props.handleSubmit} 
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit = async (event) => {
        console.log("Posting Request");
        event.preventDefault();
        const resp = await axios.post(
            `http://rk2357.pythonanywhere.com/add_task/`,
            { id: 1,
              description: this.state.description,
              subject: this.state.subject,
              interval: 5,
              link: ''
            },
        );
        console.log(resp.data);
        console.log("Request posted");
        // console.log(await axios.get(`http://rk2357.pythonanywhere.com/add_task/`));
        this.setState((state, props) => {
            return {description: '', subject: ''}
        })
        //   axios.post(`http://rk2357.pythonanywhere.com/add_task`, { user })
        //   .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        //   })
    };

    handleChangeSubjectText(text) {
        this.setState((state, props) => {
            return {subject: text}
        }, () => {
            console.log(this.state.subject);
        })
    }
    
    handleChangeDescriptionText(text) {
        this.setState((state, props) => {
            return {description: text}
        }, () => {
            console.log(this.state.description);
        })
    }

    render () {

        return (
            <View >
                <Text>Study Task Details</Text>
                <TextInput 
                    style={styles.inputStyle} 
                    placeholder="Subject" 
                    value={this.state.subject}
                    onChangeText={text => this.handleChangeSubjectText(text)}/>
                <TextInput 
                    style={styles.inputStyle} 
                    placeholder="Description" 
                    value={this.state.description} onChangeText={text => this.handleChangeDescriptionText(text)}/>
                <DoneButton handleSubmit={this.handleSubmit}/>
                <Text>Tap here to choose when you want to master this subject by: </Text>
                <DateToMasterByPicker handler={this.handler} masterByDate={this.state.dateToMasterBy} />
                <Text>Default study interval: Study every 5 days</Text>
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