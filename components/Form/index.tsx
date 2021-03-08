import React, {
  memo,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import uuid from "react-native-uuid";

import { AppContext, contextType } from "../../context";

import EditBox from "../EditBox";
import { Text } from "../Themed";
import { getCurrentUserData, getUser } from "../../store/getters";
import UserPopup from "../UserPopup";
import { addUser, editUser } from "../../store/actions";
import { storeData } from "../../constants/helper";

enum SelectionType {
  ADD,
  EDIT,
  DELETE,
}

function FormContent({ type, setPopup, selectedUsers }: any) {
  const currentUserData = useSelector(getCurrentUserData);
  // const userData = useSelector(getUser);
  const dispatch = useDispatch();

  const { theme } = useContext<contextType>(AppContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    number: "",
    email: "",
    id: "",
  });

  useEffect(() => {
    if (type === SelectionType.EDIT) {
      const user = currentUserData.filter(
        (usr) => usr.id === selectedUsers.current[0]
      )[0];
      setFormData({
        fName: user.userName.split(" ")[0],
        lName: user.userName.split(" ")[1],
        number: user.contactNo.toString(),
        email: user.email,
        id: user.id,
      });
    }
  }, [currentUserData, selectedUsers, type]);

  const changeUserContent = useCallback(async () => {
    if (
      formData.number === "" ||
      formData.email === "" ||
      formData.fName === "" ||
      formData.lName === ""
    ) {
      setError("Please enter all fields");
      return;
    } else if (SelectionType.ADD === type) {
      const ind = currentUserData.findIndex(
        (usr) =>
          usr.contactNo === formData.number || usr.email === formData.email
      );
      if (ind !== -1) {
        setError("Email or Phone number already exist");
        return;
      }
    }
    setError("");
    switch (type) {
      case SelectionType.ADD:
        dispatch(
          addUser({
            id: uuid.v4().toString(),
            email: formData.email,
            userName: `${formData.fName} ${formData.lName}`,
            contactNo: formData.number,
            contacts: [],
          })
        );
        break;
      case SelectionType.EDIT:
        dispatch(
          editUser({
            id: formData.id,
            email: formData.email,
            userName: `${formData.fName} ${formData.lName}`,
            contactNo: formData.number,
            contacts: [],
          })
        );
        break;
      default:
        break;
    }
    setPopup(false);
  }, [currentUserData, dispatch, formData, setPopup, type]);

  return (
    <>
      <EditBox
        placeholder="Enter Your FirstName"
        onChangeText={(val: string) => setFormData({ ...formData, fName: val })}
        value={formData.fName}
      />
      <EditBox
        placeholder="Enter Your LastName"
        onChangeText={(val: string) => setFormData({ ...formData, lName: val })}
        value={formData.lName}
      />
      <EditBox
        placeholder="Enter Your Email"
        onChangeText={(val: string) => setFormData({ ...formData, email: val })}
        keyboardType={"email-address"}
        value={formData.email}
      />
      <EditBox
        placeholder="Enter Your Your Mobile number"
        onChangeText={(val: string) =>
          setFormData({ ...formData, number: val })
        }
        keyboardType={"numeric"}
        value={formData.number}
      />
      <Button
        onPress={changeUserContent}
        title={type === SelectionType.ADD ? "ADD TO CONTACT" : "MODIFY CONTACT"}
        color={theme.colors.secondaryColor}
      />
      <Text style={{ color: "red" }}>{error}</Text>
    </>
  );
}

export default memo(FormContent);
