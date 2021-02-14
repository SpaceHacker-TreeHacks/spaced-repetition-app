import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddStudyTask from './AddStudyTask'
import StudyTaskList from './StudyTaskList';

export default function App() {
  return (
    <View style={styles.container}>
      <AddStudyTask />
      {/* <StudyTaskList /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20
  },
});
