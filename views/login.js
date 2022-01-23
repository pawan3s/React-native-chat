import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import loginIcon from "../assets/login.png";
import baseURL from "../api/baseURL";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const [errorFields, setErrorFields] = useState({
    emailError: "",
    passwordErrror: "",
  });

  const validate = () => {
    let emailerr = "";
    let passworderr = "";
    if (email === "" || !email.includes("@")) {
      emailerr = "Please Enter your email";
    }
    if (password === "") {
      passworderr = "Please Enter your password";
    }
    if (emailerr || passworderr) {
      setErrorFields({
        emailError: emailerr,
        passwordErrror: passworderr,
      });
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (validate()) {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await axios
          .post(baseURL + "/users/login", { email, password }, config)
          .then(async ({ data }) => {
            await SecureStore.setItemAsync("userId", data.id);
            await SecureStore.setItemAsync("userToken", data.token);
            setLoading(false);
            setPassword("");
            ToastAndroid.showWithGravity(
              "Logged in Successfully",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            navigation.navigate("ConversationList");
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Image style={styles.image} source={loginIcon} />
      <StatusBar style='auto' />
      <View
        style={
          errorFields.emailError ? styles.inputViewError : styles.inputView
        }
      >
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your Email'
          placeholderTextColor='#003f5c'
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrorFields({ emailError: "" });
          }}
          // error={errorFields.emailError}
        />
      </View>
      <View
        style={
          errorFields.passwordErrror ? styles.inputViewError : styles.inputView
        }
      >
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your Password'
          placeholderTextColor='#003f5c'
          value={password}
          secureTextEntry={true}
          passwordRules='password must have at least 8 digits'
          onChangeText={(value) => {
            setPassword(value);
            setErrorFields({ passwordErrror: "" });
          }}
          // error={errorFields.passwordErrror}
        />
      </View>
      <TouchableOpacity>
        <Text
          style={styles.forgot_button}
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>
          {loading ? <ActivityIndicator size='large' color='white' /> : "LOGIN"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text>Don't have an account? </Text>
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    marginBottom: 20,
    width: 150,
    height: 130,
  },
  inputView: {
    backgroundColor: "#d2d5d9",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  inputViewError: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 3,
    marginLeft: 20,
  },
  forgot_button: {
    height: 20,
    marginBottom: 10,
    color: "#692369",
    marginTop: -10,
  },
  loginBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#692369",
  },
  loginText: {
    color: "white",
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  register: {
    color: "#692369",
  },
});

export default Login;
