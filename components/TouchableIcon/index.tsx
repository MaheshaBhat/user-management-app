import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { ColorValue, TouchableOpacity, ViewStyle } from "react-native";

interface Props {
  name: any;
  size: number;
  onPress?: () => void;
  style?: ViewStyle;
  color: ColorValue;
  disabled?: boolean;
}

export default memo(function TouchableIcon({
  name,
  size,
  onPress = () => {},
  style,
  color,
  disabled = false,
}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={style} disabled={disabled}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
});
