import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import AppButton from "./AppButton";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';




function WelcomeScreen({ navigation }, props) {
  const onPressLogin = () => {
    navigation.navigate('Login');
    console.log("Button pressed");
  }

  const onPressRegister = () => {
    navigation.navigate('Register');
    console.log('Button Pressed');
  }

  return (
    <View style={styles.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} />
        <Text style={styles.tagline}>Space Repetition App</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton title="Login" onPress={onPressLogin} />
        <AppButton  title="Register"  onPress={onPressRegister} color="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#131419",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
    color: "#fff",
  },
});

export default WelcomeScreen;
