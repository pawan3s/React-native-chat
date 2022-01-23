import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
import { Appbar, List, Button } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import baseURL from "../api/baseURL";
import axios from "axios";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const id = await SecureStore.getItemAsync("userId");
    try {
      const { data } = await axios.get(baseURL + "/users/" + id);
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logoutMe = async () => {
    navigation.navigate("Login");
    await SecureStore.deleteItemAsync("userId");
  };
  return (
    <SafeAreaView>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => navigation.navigate("ConversationList")}
        />
        <Appbar.Content title='Profile' />
      </Appbar.Header>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: user.profilePicture,
          }}
        />
      </View>
      <View style={styles.profileDetails}>
        <View style={styles.name}>
          <List.Icon color='#692369' icon='account' />
          <Text style={styles.nameText}>{user.full_Name}</Text>
        </View>
        <View style={styles.name}>
          <List.Icon color='#692369' icon='email' />
          <Text style={styles.nameText}>{user.email}</Text>
        </View>
        <View style={styles.name}>
          <List.Icon color='#692369' icon='alert-circle-outline' />
          <Text style={styles.nameText}>{user.username}</Text>
        </View>
        <Button mode='contained' style={styles.logout} onPress={logoutMe}>
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#692369",
    height: 70,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 25,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  profileDetails: {
    marginTop: 30,
    alignItems: "flex-start",
    marginLeft: 40,
  },
  name: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  nameText: {
    color: "#692369",
    fontSize: 17,
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#692369",
    marginLeft: 50,
    width: 200,
    borderRadius: 15,
  },
});

export default Profile;
