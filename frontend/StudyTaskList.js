import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const TASKS = [
    {
        id: 1,
        title: 'Study Spanish',
        subtitle: 'Spanish',
        studyDate: 'Feb. 28, 2021'
    }
]

const Item = ({ title, subtitle, studyDate }) => {
    return (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.studyDate}>{studyDate}</Text>
    </View>
    );
}

const StudyTaskList = () => {
    const renderItem = ({ item }) => (
        <Item title={item.title} subtitle={item.subtitle} studyDate={item.studyDate}/>
    );

    // Calls the register function for our application ONCE
    // Empty braces to display the Expo push token on a device
    useEffect(() => {
        registerForPushNotifications();
      }, [])

    return (  
        <SafeAreaView style={styles.container}>
            <Text style={{alignSelf: 'center', fontSize: '15em'}}>Study Tasks</Text>
            <FlatList styles={styles.taskList} data={TASKS} renderItem={renderItem} keyExtractor={item => item.id}/>
        </SafeAreaView>
    );
}

//ASync function to request a token from React Native Expo
const registerForPushNotifications = async () => { 
    try {
       const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
       if (!permission.granted) return;
       const token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    } catch (error) {
      console.log('Error getting a token', error);
    }
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
    }
  });

export default StudyTaskList;