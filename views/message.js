import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

const Message = ({ own, message }) => {
  return (
    <SafeAreaView style={own ? styles.mycontent : styles.othercontent}>
      <Text style={own ? styles.myText : styles.otherText}>
        {message.message}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mycontent: {
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
  othercontent: {
    marginBottom: 10,
    alignItems: "flex-start",
  },
  myText: {
    padding: 10,
    color: "white",
    backgroundColor: "#692369",
    maxWidth: 300,
    marginRight: 20,
    borderRadius: 15,
  },
  otherText: {
    padding: 10,
    color: "white",
    backgroundColor: "gray",
    borderRadius: 15,
    maxWidth: 300,
    marginLeft: 20,
  },
});

export default Message;
