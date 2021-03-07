import { Ionicons } from "@expo/vector-icons";
import { StackHeaderProps } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { View, Text } from "../Themed";

export default function ContactHeader(props: StackHeaderProps) {
  return (
    <SafeAreaView
      style={{
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        elevation: 1,
      }}
    >
      <LinearGradient
        colors={["#ff8866", "#ff65a4"]}
        style={{
          paddingHorizontal: "3%",
          flexDirection: "row",
          alignItems: "center",
        }}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Ionicons color="#fff" size={25} name="people-circle-outline" />
        <View
          style={{
            marginVertical: "1%",
            marginLeft: "0.5%",
            backgroundColor: "transparent",
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "space-mono-bold",
              color: "#fff",
            }}
          >
            Contacts
          </Text>
          <Text style={{ fontSize: 15, color: "#fff" }}>
            Welcome to Contact Page
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
