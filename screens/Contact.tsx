import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { Text, View } from "../components/Themed";
import {
  getCurrentUserData,
  getCurrentUserName,
  getUser,
} from "../store/getters";

import { AppContext, contextType } from "../context";
import { deleteUser, searchUser, setDataList } from "../store/actions";
import ManageUser from "../components/ManageUser";
import DataList from "../components/DataList";
import UserPopup from "../components/UserPopup";
import EditBox from "../components/EditBox";
import Form from "../components/Form";
import { getData, storeData } from "../constants/helper";

enum SelectionType {
  ADD,
  EDIT,
  DELETE,
}
export default function Contact() {
  const { theme } = useContext<contextType>(AppContext);
  const [isEditNeeded, enableEdit] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const [type, setType] = useState(-1);

  const selectedUserListRef = useRef<Array<string>>([]);

  const dispatch = useDispatch();

  // load the dummy data
  useEffect(() => {
    (async () => {
      const data = await getData("@usrData");
      if (!data) {
        const value = require("../assets/data/dummy.json");
        dispatch(setDataList(value));
        await storeData("@usrData", JSON.stringify(value));
      } else {
        dispatch(setDataList(JSON.parse(data as string)));
      }
    })();
  }, [dispatch]);

  const removeUser = useCallback(async () => {
    dispatch(deleteUser(selectedUserListRef.current));
    selectedUserListRef.current = [];
    enableEdit(false);
  }, [dispatch]);

  const setSelected = useCallback((arr: Array<string>) => {
    selectedUserListRef.current = arr;
  }, []);

  return (
    <View style={styles.container}>
      <ManageUser
        isEditNeeded={isEditNeeded}
        setType={setType}
        setPopup={setPopup}
        deleteUser={removeUser}
      />

      <View style={styles.searchWrapper}>
        <EditBox
          icon="search-outline"
          placeholder="search contacts"
          onChangeText={(val: string) => dispatch(searchUser(val))}
          searchWidth="60%"
        />
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => {
            setType(SelectionType.ADD);
            setPopup(true);
          }}
        >
          <LinearGradient
            colors={[theme.colors.primaryColor, theme.colors.secondaryColor]}
            style={styles.btnStyle}
          >
            <Ionicons
              color="#fff"
              size={12}
              name="add-outline"
              style={{ marginLeft: "3%" }}
            />
            <Text style={{ color: "#fff" }}>Add Contacts</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.listHeaderStyle,
          { backgroundColor: theme.colors.border },
        ]}
      >
        <Ionicons
          color="#ff7d7b"
          size={20}
          name="add-circle-outline"
          style={{ marginLeft: "3%" }}
        />
        <Text style={{ marginLeft: "3%" }}>Basic Info</Text>
      </View>
      <DataList
        enableEdit={enableEdit}
        setSelected={setSelected}
        selectedUserList={selectedUserListRef}
      />
      <UserPopup
        isPopup={isPopup}
        setPopup={setPopup}
        contentStyle={{ justifyContent: "space-around", alignItems: "center" }}
      >
        <Form
          type={type}
          setPopup={setPopup}
          selectedUsers={selectedUserListRef}
        />
      </UserPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: "3%",
    position: "relative",
  },
  searchWrapper: {
    flexDirection: "row",
    paddingVertical: "1%",
  },
  searchContainer: {
    flexDirection: "row",
    width: "60%",
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
  listHeaderStyle: {
    flexDirection: "row",
    paddingVertical: "2%",
    marginTop: "0.5%",
  },
  btnStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "2.5%",
    paddingHorizontal: "0.5%",
    borderRadius: 5,
    flexDirection: "row",
    height: "100%",
  },
});
