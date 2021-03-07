import React, { memo, useRef, useCallback } from "react";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

import { getCurrentUserData } from "../../store/getters";

import ContactItem from "../ContactItem";

function DataList({ enableEdit, setSelected, selectedUserList }: any) {
  const data = useSelector(getCurrentUserData);

  const handleUserSelection = useCallback(
    (val: string, flag: boolean) => {
      const nsul = selectedUserList.current.slice(0);
      if (flag) {
        nsul.push(val);
      } else {
        const ind = nsul.indexOf(val);
        if (ind !== -1) {
          nsul.splice(ind, 1);
        }
      }
      setSelected(nsul);
      if (nsul.length === 1) {
        enableEdit(true);
      } else {
        enableEdit(false);
      }
    },
    [enableEdit, selectedUserList, setSelected]);

  const _renderItem = useCallback(
    ({ item, index }) => (
      <ContactItem
        key={item.id}
        item={item}
        setSelectedUserList={handleUserSelection}
      />
    ),
    [handleUserSelection]
  );
  return (
    <FlatList
      data={data}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default memo(DataList);
