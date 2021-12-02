import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { THEME } from "../DynamicStyle/style";

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={THEME.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
