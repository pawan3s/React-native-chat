import React, { useState, useEffect } from "react";
import registerIcon from "../assets/register.png";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import baseURL from "../api/baseURL";

const Register = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const [errorFields, setErrorFields] = useState({
    emailError: "",
    fullNameError: "",
    usernameError: "",
    passwordError: "",
    confrimPError: "",
  });

  const validate = () => {
    let emailError = "";
    let fullNameError = "";
    let usernameError = "";
    let passwordError = "";
    let confrimPError = "";
    if (fullName === "" || fullName.length < 5) {
      fullNameError = "Full Name Error";
    }
    if (email === "" || !email.includes("@")) {
      emailError = "Email Error";
    }
    if (username === "") {
      usernameError = "username Error";
    }
    if (password === "" || password.length < 6) {
      passwordError = "Password must have at least 6 characters";
      Alert.alert(passwordError);
    }
    if (confirmPassword != password) {
      confrimPError = "passwords didnot match";
      Alert.alert(confrimPError);
    }
    if (
      fullNameError ||
      emailError ||
      passwordError ||
      confrimPError ||
      usernameError
    ) {
      setErrorFields({
        emailError,
        usernameError,
        fullNameError,
        passwordError,
        confrimPError,
      });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (validate()) {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        await axios
          .post(
            baseURL + "/users/register",
            { email, username, password, full_Name: fullName },
            config
          )
          .then(() => {
            // Alert.alert("User Registered!");
            setLoading(false);
            ToastAndroid.showWithGravity(
              "Registration Successful",
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            navigation.navigate("Login");
          });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <Image style={styles.image} source={registerIcon} />
      <StatusBar style='auto' />
      <View
        style={
          errorFields.fullNameError ? styles.inputViewError : styles.inputView
        }
      >
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your Full Name'
          placeholderTextColor='#003f5c'
          value={fullName}
          onChangeText={(value) => {
            setFullName(value);
            setErrorFields({ fullNameError: "" });
          }}
        />
      </View>
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
        />
      </View>
      <View
        style={
          errorFields.usernameError ? styles.inputViewError : styles.inputView
        }
      >
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your username'
          placeholderTextColor='#003f5c'
          value={username}
          onChangeText={(value) => {
            setUsername(value);
            setErrorFields({ usernameError: "" });
          }}
        />
      </View>
      <View
        style={
          errorFields.passwordError ? styles.inputViewError : styles.inputView
        }
      >
        <TextInput
          style={styles.TextInput}
          placeholder='Enter the Password'
          placeholderTextColor='#003f5c'
          value={password}
          secureTextEntry={true}
          passwordRules='password must have at least 8 digits'
          onChangeText={(value) => {
            setPassword(value);
            setErrorFields({ passwordError: "" });
          }}
        />
      </View>
      <View
        style={
          errorFields.confrimPError ? styles.inputViewError : styles.inputView
        }
      >
        <TextInput
          style={styles.TextInput}
          placeholder='Confirm the Password'
          placeholderTextColor='#003f5c'
          value={confirmPassword}
          secureTextEntry={true}
          passwordRules='password must have at least 8 digits'
          onChangeText={(value) => {
            setConfirmPassword(value);
            setErrorFields({ confrimPError: "" });
          }}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
        <Text style={styles.loginText}>
          {loading ? (
            <ActivityIndicator size='large' color='white' />
          ) : (
            "REGISTER"
          )}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.row}>
        <Text>Already have an account? </Text>
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 0,
  },
  image: {
    marginBottom: 5,
    width: 150,
    height: 130,
  },
  inputView: {
    backgroundColor: "#d2d5d9",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
  },
  inputViewError: {
    backgroundColor: "white",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 20,
    marginBottom: 20,
    color: "#1b84f5",
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
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  loginText: {
    color: "white",
  },
  register: {
    color: "#692369",
  },
});

export default Register;
