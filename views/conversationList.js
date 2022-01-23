import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Appbar, List } from "react-native-paper";
import deleteIcon from "../assets/delete-16.png";
import baseURL from "../api/baseURL";
import axios from "axios";

const Messanger = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);

  const friendList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const [deleteVisible, setDeleteVisible] = useState(false);

  useEffect(() => {
    const getMyConversation = async () => {
      try {
        const id = await SecureStore.getItemAsync("userId");
        const token = await SecureStore.getItemAsync("userToken");
        const { data } = await axios.get(baseURL + "/conversations/" + id, {
          headers: { Authorization: "Bearer " + token },
        });
        setConversations(data.conversations);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMyConversation();
  }, []);
  const deletMessage = async (id) => {
    const userId = await SecureStore.getItemAsync("userId");
    console.log(userId);
    setDeleteVisible(false);
  };
  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title='Faith' subtitle={"When you have faith"} />
        <Appbar.Action
          icon={deleteVisible ? "window-close" : "delete"}
          onPress={() => setDeleteVisible(!deleteVisible)}
        />
        <Appbar.Action
          icon='account-circle'
          onPress={() => navigation.navigate("Profile")}
        />
      </Appbar.Header>
      <ScrollView style={styles.friendsContainer}>
        {conversations.map((c) => (
          <TouchableOpacity
            style={styles.friend}
            key={c._id}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Conversation")}
          >
            <List.Item
              title='Pawan Subedi'
              description='Whats up buddy?'
              left={() => (
                <Image
                  style={styles.image}
                  source={{
                    uri: "https://media.istockphoto.com/photos/beauty-portrait-of-young-woman-picture-id1309405076?b=1&k=20&m=1309405076&s=170667a&w=0&h=28jfs2oOeQfL65kzGPVoPS8xxFJWK1h7LEkTSWKY-lM=",
                  }}
                />
              )}
              right={() =>
                !deleteVisible ? (
                  <Text>11:26 am</Text>
                ) : (
                  <TouchableOpacity
                    onPress={() => deletMessage(c._id)}
                    style={styles.deleteIcon}
                  >
                    <Image source={deleteIcon} />
                  </TouchableOpacity>
                )
              }
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#692369",
    height: 90,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  friendsContainer: {
    overflow: "scroll",
    marginTop: 10,
    marginBottom: 20,
  },
  friend: {
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  deleteIcon: {
    marginTop: 10,
    marginRight: 15,
  },
});

export default Messanger;
