/* eslint-disable react/style-prop-object */
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./store";
import AppContext from "./context";
import AppStatusBar from "./components/StatusBar";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <AppContext>
            <>
              <Navigation />
              <AppStatusBar />
            </>
          </AppContext>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
