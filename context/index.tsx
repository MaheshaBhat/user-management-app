import React, {
  useState,
  ReactChild,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { AppState, AppStateStatus } from "react-native";
import { useSelector } from "react-redux";

import useColorScheme from "../hooks/useColorScheme";
import Colors, { colorType } from "../constants/Colors";
import { storeData } from "../constants/helper";
import { getUser } from "../store/getters";

export type contextType = {
  theme: colorType;
  setThemeType: Function;
};
export const AppContext = createContext<contextType>({
  theme: Colors.light,
  setThemeType: () => {},
});

interface Props {
  children: ReactChild;
}
export default (props: Props) => {
  const [themeType, setThemeType] = useState("light");
  const { children } = props;
  const allUsers = useSelector(getUser);

  const handleAppStateChange = useCallback(
    async (nextAppState: AppStateStatus) => {
      if (nextAppState === "background") {
        await storeData("@usrData", JSON.stringify(allUsers));
      }
    },
    [allUsers]
  );

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);
    return () => AppState.removeEventListener("change", handleAppStateChange);
  }, [handleAppStateChange]);

  return (
    <AppContext.Provider
      value={{
        theme: themeType === "dark" ? Colors.dark : Colors.light,
        setThemeType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
