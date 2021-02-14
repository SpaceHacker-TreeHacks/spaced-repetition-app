import React from 'react';
import { SafeAreaView, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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

const StudyTaskList = ({navigation}) => {


    const renderItem = ({ item }) => (
        <Item title={item.title} subtitle={item.subtitle} studyDate={item.studyDate}/>
    );

    return (  
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Add Study Task')}><Text style={{
                alignSelf: 'center', 
                paddingTop: 5, 
                paddingBottom: 5,
                fontSize: 20, 
                fontWeight: 'bold'}}>Add New Task</Text></TouchableOpacity>
            <StatusBar style={'auto'} />
            {/* <Text style={{alignSelf: 'center', fontSize: '15em'}}>Study Tasks</Text> */}
            <FlatList styles={styles.taskList} data={TASKS} renderItem={renderItem} keyExtractor={item => item.id}/>
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