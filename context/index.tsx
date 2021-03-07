import React, {
  useState,
  ReactChild,
  createContext,
  useEffect,
  useCallback,
} from "react";
import { AppState, AppStateStatus } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import Colors, { colorType } from "../constants/Colors";

export type contextType = {
  theme: colorType;
  setThemeType: Function;
  appState: AppStateStatus;
};
export const AppContext = createContext<contextType>({
  theme: Colors.light,
  setThemeType: () => {},
  appState: AppState.currentState
});

interface Props {
  children: ReactChild;
}
export default (props: Props) => {
  const [themeType, setThemeType] = useState("light");
  const { children } = props;
  const [appState, setAppState] = useState(AppState.currentState);

  const handleAppStateChange = useCallback(
    (nextAppState: any) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        // console.log("App has come to the foreground!");
      }
      setAppState(nextAppState);
    },
    [appState]
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
        appState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
