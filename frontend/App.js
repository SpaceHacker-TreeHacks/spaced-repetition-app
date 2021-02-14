
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AddStudyTask from './AddStudyTask'
import StudyTaskList from './StudyTaskList';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from "./components/WelcomeScreen";
const Stack = createStackNavigator();

export default function App() {

  const getData = async (event) => {
    const resp = await axios.get(`http://rk2357.pythonanywhere.com/tasks`,
    {
      params: {
        id: 1,
        date: "2021-02-19"
      }
    })
  }

  useEffect(() => {
    getData();
  });
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main Page" component={StudyTaskList} options={{title: 'Study Tasks'}} />
        <Stack.Screen name="Add Study Task" component={AddStudyTask} options={{title: 'Add Study Task'}} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
});
