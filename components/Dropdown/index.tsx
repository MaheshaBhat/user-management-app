import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

export default function Dropdown(props: any) {
  const { getContent, style, children } = props;
  const btnRef = useRef<View>(null);
  const position = useRef({});

  const getPosition = useCallback(() => {
    if (btnRef) {
      btnRef.current?.measure((x, y, width, height, pageX, pageY) => {
        position.current = {
          left: pageX,
          top: pageY,
          width,
          height,
        };
      });
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          getContent(position.current);
        }}
      >
        <View ref={btnRef} onLayout={getPosition} style={style}>
          {children}
        </View>
      </TouchableOpacity>
    </>
  );
}

export function DropDownContent(props: any) {
  const {
    position,
    hide,
    isDropdown,
    data,
    getSelectedVal,
    type,
    onPress,
  } = props;

  if (!isDropdown) return null;

  const { top, left, height, width } = position;
  return (
    <Modal visible={isDropdown} animationType="none" transparent>
      <Pressable style={styles.container} onPress={() => hide()}>
        <View style={[styles.menu, { top, left, width }]}>
          {data.map((item: any) => (
            <TouchableOpacity
              style={[styles.itemStyle, { width }]}
              onPress={() => onPress(item[type])}
              key={item.id}
            >
              <Text>{item[type]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  menu: {
    position: "absolute",
    backgroundColor: "white",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  itemStyle: {
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingVertical: 10,
  },
});
