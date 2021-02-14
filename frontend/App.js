import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddStudyTask from "./AddStudyTask";
import StudyTaskList from "./StudyTaskList";
import axios from "axios";
import WelcomeScreen from "./components/WelcomeScreen";

export default function App() {
  useEffect(() => {
    const resp = axios.get(`http://rk2357.pythonanywhere.com/tasks`, {
      params: {
        id: 1,
        date: "2021-02-13",
      },
    });
    console.log(resp.data);
  });

  return (
    <View style={styles.container}>
      {/* <AddStudyTask />
      <StudyTaskList />
      <StatusBar style="auto" /> */}
      <WelcomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
});
