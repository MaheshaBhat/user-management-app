import React, { useState, useContext, memo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ColorValue, StyleSheet, TouchableOpacity } from "react-native";

import { View, Text } from "../Themed";
import { User } from "../../store/types";
import { AppContext, contextType } from "../../context";

interface Props {
  item: User;
  setSelectedUserList: (val: string, flag: boolean) => void;
}

const getShortName = (name: string) => {
  return name
    .split(" ")
    .map((i) => i[0])
    .join("")
    .toUpperCase();
};

// Color Generation Function
const randomRGB = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

function ContactItem(props: Props) {
  const { item, setSelectedUserList } = props;
  const [isChecked, setCheckBox] = useState(false);
  const { theme } = useContext<contextType>(AppContext);
  const [backgroundColor, setBackgroundColor] = useState(randomRGB());

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCheckBox(!isChecked);
          setSelectedUserList(item.id, !isChecked);
        }}
        style={{ marginLeft: "3%" }}
      >
        <Ionicons
          color={isChecked ? theme.colors.secondaryColor : theme.colors.border}
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
            backgroundColor,
          },
        ]}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>
          {getShortName(item.userName)}
        </Text>
      </View>
      <View style={{ marginLeft: "3%" }}>
        <Text style={{ fontSize: 18 }}>{item.userName}</Text>
        <Text style={{ fontSize: 14 }}>{item.email}</Text>
      </View>
    </View>
  );
}

export default memo(ContactItem);
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
