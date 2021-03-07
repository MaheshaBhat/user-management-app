import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import { View, Text } from '../Themed';
import { User } from "../../store/types";

interface Props {
  item: User;
}

// Color Generation Function
const randomRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

const getShortName = (name: string) => {
  return name
    .split(" ")
    .map((i) => i[0])
    .join("").toUpperCase();
};

export default function ContactItem({ item }: Props) {
  const [isChecked, setCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}} style={{ marginLeft: "3%" }}>
        <Ionicons
          color="grey"
          size={20}
          name={isChecked ? "checkbox" : "checkbox-outline"}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.circleStyle,
          {
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: randomRGB(),
          },
        ]}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>{getShortName(item.userName)}</Text>
      </View>
      <View style={{ marginLeft: "3%" }}>
        <Text style={{ fontSize: 18 }}>{item.userName}</Text>
        <Text style={{ fontSize: 14 }}>{item.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: "2.5%",
    alignItems: "center",
  },
  circleStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "3%",
  },
});
