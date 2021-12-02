import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Platform,
  SafeAreaView,
} from "react-native";
import { THEME } from "../DynamicStyle/style";

const CommingSoon = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <ImageBackground
        style={{ width: "100%", height: "100%" }}
        source={require("../assets/images/comming_soon.jpg")}
      />
    </SafeAreaView>
  );
};

export default CommingSoon;
