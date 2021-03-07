import React, { useContext } from "react";
import { Button, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { AppContext, contextType } from "../context";

export default function Home() {
  const { theme, setThemeType } = useContext<contextType>(AppContext);
  return (
    <View style={styles.container}>
      <Button
        title={"Change Theme"}
        onPress={() => setThemeType(theme.dark ? "light" : "dark")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
