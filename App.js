import { StatusBar } from "expo-status-bar";
import React from "react";
import Navigation from "./navigation";
import { useFonts } from "expo-font";
import { Loader } from "./components";
import { SafeAreaView } from "react-native-safe-area-context";
import { THEME } from "./DynamicStyle/style";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";
import { Platform } from "react-native";

export default function App() {
  const [fontLoaded] = useFonts({
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
  });

  if (!fontLoaded) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          style="light"
          backgroundColor={Platform.OS === "ios" ? "#FFFFFF" : THEME.primary}
        />
        {Platform.OS === "ios" ? <Navigation /> : <Navigation />}
      </PersistGate>
    </Provider>
  );
}
