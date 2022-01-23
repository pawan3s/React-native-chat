import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(null);

  const handleForgetPassword = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Forgot password?</Text>
      <Text style={{ marginBottom: 20 }}>
        Confirm your email and we'll send you the instructions
      </Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Enter your Email'
          placeholderTextColor='#003f5c'
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleForgetPassword}>
        <Text style={styles.loginText}>
          {loading ? "LOADING" : "RESET PASSWORD"}
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputView: {
    backgroundColor: "#d2d5d9",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
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
});

export default Forgotpassword;
