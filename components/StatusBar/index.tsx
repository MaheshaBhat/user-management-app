import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { AppContext, contextType } from "../../context";

export default function AppStatusBar() {
  const { theme } = useContext<contextType>(AppContext);
  return (
    <StatusBar
      style={theme.dark ? "dark" : "light"}
      backgroundColor={theme.dark ? "#fff" : "#000"}
      animated
    />
  );
}
