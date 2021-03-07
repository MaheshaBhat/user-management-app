import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { View, Text } from "../Themed";

export default function UserPopup({
  isPopup,
  setPopup,
  children,
  contentStyle,
}: any) {
  return (
    <Modal visible={isPopup} animationType="fade" transparent>
      <Pressable style={styles.container} onPress={() => setPopup(false)}>
        <View style={styles.popupStyle}>
          <Pressable
            style={[styles.content, contentStyle]}
            onPress={(evt) => true}
          >
            {children}
          </Pressable>
          <LinearGradient
            colors={["#ff8866", "#ff65a4"]}
            style={styles.closeStyle}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Text style={{ fontSize: 15, color: "#fff" }}>Close</Text>
          </LinearGradient>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#33313252",
  },
  popupStyle: {
    height: "50%",
    width: "90%",
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    overflow: "hidden",
  },
  closeStyle: {
    width: "100%",
    height: "12%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    height: "88%",
    width: "100%",
    zIndex: 1,
    paddingHorizontal: "3%",
  },
});
