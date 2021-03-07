import { Ionicons } from "@expo/vector-icons";
import React, { useContext, memo } from "react";
import { TextInput, StyleSheet } from "react-native";

import { View } from "../Themed";
import { AppContext, contextType } from "../../context";

function EditBox({
  icon,
  placeholder,
  onChangeText,
  searchWidth = "100%",
  keyboardType = "default",
  value,
}: any) {
  const { theme } = useContext<contextType>(AppContext);
  return (
    <View
      style={[
        styles.searchContainer,
        { borderColor: theme.colors.border, width: searchWidth },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        style={[styles.textInputContainer, { color: theme.colors.text}]}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        value={value}
        placeholderTextColor={theme.colors.text}
      />
      {!!icon && <Ionicons color={theme.colors.border} size={20} name={icon} />}
    </View>
  );
}

export default memo(EditBox);

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: "row",
    paddingVertical: "1%",
  },
  searchContainer: {
    flexDirection: "row",
    // width: "0%",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
  },
  textInputContainer: {
    borderWidth: 0,
    flex: 1,
    marginLeft: "5%",
    fontFamily: "space-mono",
  },
});
