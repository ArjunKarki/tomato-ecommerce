import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { THEME, width, height } from "../DynamicStyle/style";

export default function CartLoader() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <View style={styles.smallContainer}>
        <ActivityIndicator size="small" color={THEME.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: THEME.background,
  },
  smallContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
