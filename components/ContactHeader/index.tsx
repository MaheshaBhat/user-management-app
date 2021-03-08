import { Ionicons } from "@expo/vector-icons";
import { StackHeaderProps } from "@react-navigation/stack";
import React, { useState, useCallback, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet } from "react-native";

import { View, Text } from "../Themed";
import Dropdown, { DropDownContent } from "../Dropdown";
import { getCurrentUserName, getUser } from "../../store/getters";
import { setCurrentUser } from "../../store/actions";
// import { storeData } from "../../constants/helper";
// import { AppContext, contextType } from "../../context";

export default function ContactHeader(props: StackHeaderProps) {
  // const { appState } = useContext<contextType>(AppContext);
  const [position, setPosition] = useState({});
  const [isDropdown, showDropdown] = useState(false);
  const curUserName = useSelector(getCurrentUserName);
  const [selectedItem, setSelectedItem] = useState(curUserName);
  const allUsers = useSelector(getUser);
  const hide = useCallback(() => showDropdown(false), []);
  const dispatch = useDispatch();

  const getSelectedVal = useCallback(
    (val: string) => {
      setSelectedItem(val);
      if (val !== selectedItem) dispatch(setCurrentUser(val));
    },
    [dispatch, selectedItem]
  );

  // useEffect(() => {
  //   (async () => {
  //     if (appState === "background") {
  //       await storeData("@usrData", JSON.stringify(allUsers));
  //     }
  //   })();
  // }, [allUsers, appState]);

  return (
    <SafeAreaView>
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
        <Dropdown
          getContent={(content: any) => {
            setPosition(content);
            showDropdown(true);
          }}
          style={styles.dropdown}
        >
          <Text numberOfLines={1} style={{ fontSize: 15 }}>
            {selectedItem}
          </Text>
          {!!selectedItem && (
            <Ionicons name="arrow-down" size={10} color="black" />
          )}
        </Dropdown>
        <DropDownContent
          position={position}
          isDropdown={isDropdown}
          hide={hide}
          data={allUsers}
          getSelectedVal={getSelectedVal}
          type="userName"
          onPress={(userName: string) => {
            hide();
            getSelectedVal(userName);
          }}
        />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    paddingVertical: "2%",
    borderColor: "grey",
    borderRadius: 10,
    borderWidth: 1,
    marginLeft: "5%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // overflow: 'hidden',
    width: "60%",
    paddingHorizontal: "3%",
  },
});
