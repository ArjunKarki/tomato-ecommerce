import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { THEME } from "../DynamicStyle/style";

export default function Container({ children, style }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, style]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.backgroundColor,
    flex: 1,
    // paddingHorizontal: 8
  },
});
