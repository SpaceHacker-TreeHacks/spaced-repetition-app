import React from 'react';
import { StyleSheet, FlatList, Text, View } from 'react-native';

const StudyTaskList = () => {
    return (
        <View style={styles.container}>
            <Text>Study Tasks</Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 15,
      alignItems: 'center'
    },
  });

export default StudyTaskList;