import { Ionicons } from "@expo/vector-icons";
import React, { useContext, memo, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from 'react-redux';

import { AppContext, contextType } from "../../context";
import { sortUser } from "../../store/actions";
import Dropdown, { DropDownContent } from "../Dropdown";
import { View, Text } from "../Themed";
import TouchableIcon from "../TouchableIcon";

enum SelectionType {
  ADD,
  EDIT,
  DELETE,
}

function ManageUser({ isEditNeeded, setType, setPopup, deleteUser }: any) {
  const { theme } = useContext<contextType>(AppContext);
  const [position, setPosition] = useState({});
  const [isDropdown, showDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState("asc");
  const dispatch = useDispatch();

  const getSelectedVal = useCallback((val: string) => {
    setSelectedItem(val);
    if (val !== selectedItem) dispatch(sortUser(val));
  }, [dispatch, selectedItem]);

  const hide = useCallback(() => showDropdown(false), []);

  return (
    <View style={styles.headStyle}>
      <View style={{ flexDirection: "row", width: "50%", height: "100%", alignItems: 'center' }}>
        <Text>Sort By:</Text>
        <Dropdown
          getContent={(content: any) => {
            setPosition(content);
            showDropdown(true);
          }}
          style={styles.dropdown}
          ic
        >
          <Text>{selectedItem}</Text>
          {!!selectedItem && (
            <Ionicons name="arrow-down" size={10} color="black" />
          )}
        </Dropdown>
        <DropDownContent
          position={position}
          isDropdown={isDropdown}
          hide={hide}
          data={[
            { type: "asc", id: 0 },
            { type: "desc", id: 1 },
          ]}
          type="type"
          onPress={(userName: string) => {
            hide();
            getSelectedVal(userName);
          }}
          getSelectedVal={getSelectedVal}
        />
      </View>
      <TouchableIcon
        color={theme.colors.primaryColor}
        size={25}
        name="trash-outline"
        onPress={deleteUser}
        style={{ marginLeft: '10%'}}
      />
      <TouchableIcon
        color={isEditNeeded ? theme.colors.primaryColor : theme.colors.border}
        size={25}
        name="pencil-outline"
        onPress={() => {
          setType(SelectionType.EDIT);
          setPopup(true);
        }}
        disabled={!isEditNeeded}
        style={{ marginLeft: '10%'}}
      />
    </View>
  );
}

export default memo(ManageUser);

const styles = StyleSheet.create({
  headStyle: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingVertical: "1%",
  },
  dropdown: {
    paddingVertical: "5%",
    borderColor: "grey",
    borderRadius: 5,
    borderWidth: 1,
    marginLeft: "10%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: "20%",
  },
});
