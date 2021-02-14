import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { RotationGestureHandler } from 'react-native-gesture-handler';

const DoneButton = (props) => {
    return (
        <Button title={props.title}
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

const radio_props = [
    {label: 'Task', value: true},
    {label: 'Bill', value: false},
];



class AddStudyTask extends Component {
    constructor(props) {
        super(props);
        this.handler = this.handler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            subject: '',
            description: '',
            dateToMasterBy: new Date(),
            preferredStudyInterval: 5,
            isTask: true,
            payeeName: '',
            amount: 0,
            payeeEmail: '',
            userid: this.props.userid
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
    // Buggy code, still works though
    handleSubmit = async (event) => {
        console.log("Posting Request");
        event.preventDefault();
        const resp = await axios.post(
            `http://rk2357.pythonanywhere.com/add_task/`,
            { id: this.state.userid,
              description: this.state.description,
              subject: this.state.subject,
              interval: 5,
              link: '',
              isTask: this.state.isTask,
              payeeName: this.state.payeeName,
              payeeEmail: this.state.payeeEmail,
              amount: this.state.amount
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

    handleChangePayeeName(name) {
        this.setState((state, props) => {
            return {payeeName: name}
        }, () => {
            console.log(this.state.payeeName);
        })
    }

    handleChangePayeeEmail(email) {
        this.setState((state, props) => {
            return {payeeEmail: email}
        }, () => {
            console.log(this.state.email);
        })
    }

    handleChangeAmount(amt) {
        this.setState((state, props) => {
            return {amount: amt}
        }, () => {
            console.log(this.state.amount);
        })
    }

    handleRadioChange(value) {
        this.setState((state, props) => {
            return {isTask: value}
        }, () => {
            console.log(value);
        })
    }

    render () {

        if (this.state.isTask) {
            return (
                <View >
                    <Text>Study Task Details</Text>
                    <RadioForm style={{marginLeft: 20}} radio_props={radio_props} initial={0} onPress={(value) => this.handleRadioChange(value)}/>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="Subject" 
                        value={this.state.subject}
                        onChangeText={text => this.handleChangeSubjectText(text)}/>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="Description" 
                        value={this.state.description} onChangeText={text => this.handleChangeDescriptionText(text)}/>
                    <DoneButton title={"Save Task"} handleSubmit={this.handleSubmit}/>
                    <Text>Tap here to choose when you want to master this subject by: </Text>
                    <DateToMasterByPicker handler={this.handler} masterByDate={this.state.dateToMasterBy} />
                    <Text>Default study interval: Study every 5 days</Text>
                </View>
            );
        } else {
            return (
                <View >
                    <Text>Bill Details</Text>
                    <RadioForm style={{marginLeft: 20}} radio_props={radio_props} initial={0} onPress={(value) => this.handleRadioChange(value)}/>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="Payee Name" 
                        value={this.state.payeeName} onChangeText={name => this.handleChangePayeeName(name)}/>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="Payee Email" 
                        value={this.state.payeeEmail} onChangeText={email => this.handleChangePayeeEmail(email)}/>
                    <TextInput 
                        style={styles.inputStyle} 
                        placeholder="Amount" 
                        value={this.state.amount} onChangeText={amt => this.handleChangeAmount(amt)}/>
                    <DoneButton title={"Pay Bill"} handleSubmit={this.handleSubmit}/>
                    <Text>Tap here to choose when you want to master this subject by: </Text>
                    <DateToMasterByPicker handler={this.handler} masterByDate={this.state.dateToMasterBy} />
                    <Text>Default study interval: Study every 5 days</Text>
                </View>
            );
        }

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