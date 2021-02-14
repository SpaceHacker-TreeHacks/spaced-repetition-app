import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// const TASKS = [
//     {
//         id: 1,
//         title: 'Study Spanish',
//         subtitle: 'Spanish',
//         studyDate: 'Feb. 28, 2021'
//     }
// ]

const testData = [
    {
        description: "Study biolody",
        interval: 5,
        link: "",
        subject: "Biology"
    }
]



//   useEffect(() => {
//     getData();
//   });



const Item = ({ description, subject, link, interval, type, payeeName, payeeEmail, amount, billid }) => {
    const navigation = useNavigation();

    const handlePress = async () => {
        const resp = await axios.post(
            `http://rk2357.pythonanywhere.com/make_payment/`,
            { 
                id: billid
            },
        );
        return resp;
    }

    if(type ==='task') {
        return (
        <TouchableOpacity onPress={() => navigation.navigate('Add Study Task')} style={styles.item}>
            <Text style={styles.title}>{description}</Text>
            <Text style={styles.subtitle}>{interval}</Text>
            <Text style={styles.studyDate}>Study Interval: {subject} days</Text>
        </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Add Study Task')} style={styles.item}>
                <Text style={styles.title}>{description}</Text>
            <   Text style={styles.subtitle}>{interval}</Text>
                <Text style={styles.title}>{payeeName}</Text>
                <Text style={styles.subtitle}>{payeeEmail}</Text>
                <Text style={styles.studyDate}>Amount: {amount} </Text>
                <Button title={"Pay Bill"} onPress={handlePress}></Button>
            </TouchableOpacity>
            );
    }
}

const StudyTaskList = ({route, navigation}) => {
    const [data, setData] = useState({});
    const {userid} = route.params;

    const getData = async (event) => {
        // console.log("user id in main page", userid);
        const resp = await axios.get(`http://rk2357.pythonanywhere.com/tasks`,
        {
          params: {
            id: userid,
            date: "2021-02-19",
          }
          
        })
        // console.log(resp.data);
        setData(resp.data);
      }
    
      useEffect(() => {
        getData();
      });
    

    const renderItem = ({ item }) => (
        <Item description={item.description} link={item.link} interval={item.subject} subject={item.interval} billid={item.id} type={item.type} payeeName={item.payeeName} payeeEmail={item.payeeEmail}/>
    );

    return (  
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Study Task', {userid: userid})}><Text style={{
                alignSelf: 'center', 
                paddingTop: 5, 
                paddingBottom: 5,
                fontSize: 15, 
                fontWeight: 'bold'}}>Add New Task</Text></TouchableOpacity>
            <StatusBar style={'auto'} />
            {/* <Text style={{alignSelf: 'center', fontSize: '15em'}}>Study Tasks</Text> */}
            <FlatList styles={styles.taskList} data={data} renderItem={renderItem} keyExtractor={() => Math.floor(Math.random() * 100000000)}/>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      backgroundColor: '#fff',
      marginTop: 15,
    },
    item: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 7,
        paddingTop: 2,
        paddingBottom: 2
    },
    taskList: {
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: 'bold',
    },
    studyDate: {
    },
    button: {
        width: '30%',
        backgroundColor: '#91bbff',
        marginTop: 15,
        marginRight: 15,
        alignSelf: 'flex-end'
    }
  });

export default StudyTaskList;