import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import axios from 'axios';

import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const handleSubmit = async (values, navigation) => {

  console.log("Values", values);
   const resp = await axios.post(`http://rk2357.pythonanywhere.com/register/`,
   {
       ...values
   })
   console.log("User Id: ", resp.data.id);
   navigation.navigate('Main Page', { userid: resp.data.id });
}

function RegisterScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "", key: "", secretKey: "" }}
        onSubmit={(values) => handleSubmit(values, navigation)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="key"
          placeholder="Checkbook key"
          secureTextEntry
          textContentType="password"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="secretKey"
          placeholder="Checkbook secret key"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
