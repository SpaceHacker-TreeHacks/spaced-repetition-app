import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddStudyTask from "./AddStudyTask";
import StudyTaskList from "./StudyTaskList";
import LoginScreen from "./components/LoginScreen"
import RegisterScreen from "./components/RegisterScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./components/WelcomeScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home Page"
          component={WelcomeScreen}
          options={{ title: "Welcome Screen" }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register" }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Main Page"
          component={StudyTaskList}
          options={{ title: "Study Tasks" }}
        />
        <Stack.Screen
          name="Add Study Task"
          component={AddStudyTask}
          options={{ title: "Add Study Task" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowRadius: 10,
    shadowColor: "rgba(255, 255, 255, 0.05)",
    shadowOpacity: 1,
  },
});
