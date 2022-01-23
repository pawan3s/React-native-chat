import {
  View,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Image,
  KeyboardAwareScrollView,
  ScrollView,
  Keyboard,
} from "react-native";
import { Appbar, FAB } from "react-native-paper";
import React, { useState, useEffect } from "react";
import Message from "./message";
import chat from "./mocks/messages.json";

export default function Conversation({ navigation }) {
  const [newMessage, setNewMessage] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(null);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardVisible]);
  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => navigation.navigate("ConversationList")}
        />
        <Image
          style={styles.imageStyle}
          source={{
            uri: "https://media.istockphoto.com/photos/beauty-portrait-of-young-woman-picture-id1309405076?b=1&k=20&m=1309405076&s=170667a&w=0&h=28jfs2oOeQfL65kzGPVoPS8xxFJWK1h7LEkTSWKY-lM=",
          }}
        />
        <Appbar.Content title='Pawan Subedi' />
      </Appbar.Header>
      <ScrollView
        style={keyboardVisible ? styles.keyboard : styles.nonKeyboard}
      >
        {chat.map((c, index) => (
          <Message message={c} own={c.id === 1} key={index} />
        ))}
      </ScrollView>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder='Message...'
          placeholderTextColor='#003f5c'
          value={newMessage}
          onChangeText={(value) => setNewMessage(value)}
        />
        <FAB
          style={styles.fab}
          small
          icon='send'
          onPress={() => console.log("Pressed")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    backgroundColor: "#692369",
    height: 70,
  },
  imageStyle: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  inputView: {
    backgroundColor: "#d2d5d9",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,
    marginLeft: 10,
    alignItems: "flex-start",
    marginTop: 10,
  },
  TextInput: {
    flex: 1,
    padding: 3,
    marginLeft: 15,
    marginRight: 15,
    maxWidth: "90%",
  },
  fab: {
    position: "absolute",
    margin: 10,
    right: -60,
    bottom: -10,
    backgroundColor: "#692369",
  },
  keyboard: {
    overflow: "scroll",
    maxHeight: "60%",
  },
  nonKeyboard: {
    overflow: "scroll",
    maxHeight: "77%",
  },
});
