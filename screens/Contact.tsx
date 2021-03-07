import React, { useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Text, View } from "../components/Themed";
import { getCurrentUserData } from "../store/getters";
import ContactItem from "../components/ContactItem";

export default function Contact() {
  const currentUserData = useSelector(getCurrentUserData);

  const _renderItem = useCallback(
    ({ item }) => <ContactItem key={item.id} item={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.headStyle}>
        <View>
          <Text>Sort By:</Text>
        </View>
        <Ionicons color="#ff7d7b" size={25} name="remove-circle-outline" />
        <Ionicons color="#ff7d7b" size={25} name="pencil-outline" />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="search contacts"
            style={styles.textInputContainer}
          />
          <Ionicons color="grey" size={20} name="search-outline" />
        </View>
        <LinearGradient colors={["#ff8866", "#ff65a4"]}>
          <TouchableOpacity>
            <Text>Add Contacts</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={styles.listHeaderStyle}>
        <Ionicons
          color="#ff7d7b"
          size={20}
          name="add-circle-outline"
          style={{ marginLeft: "3%" }}
        />
        <Text style={{ marginLeft: "3%" }}>Basic Info</Text>
      </View>
      <FlatList data={currentUserData} renderItem={_renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: '3%'
  },
  searchContainer: {
    flexDirection: "row",
    width: "60%",
    // backgroundColor: "grey",
  },
  textInputContainer: {
    borderWidth: 0,
    flex: 1,
  },
  listHeaderStyle: {
    backgroundColor: "grey",
    flexDirection: "row",
    paddingVertical: "2%",
    marginTop: "0.5%",
  },
  headStyle: {
    // backgroundColor: "grey",
    flexDirection: "row",
  },
});
