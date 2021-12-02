import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CONFIG } from "../constants";
import { THEME, TYPO } from "../DynamicStyle/style";

const { height, width } = CONFIG;

const ModalButtons = ({ onSave, onCancel }) => (
  <View style={[styles.optionWrapper]}>
    <TouchableOpacity
      onPress={() => onSave()}
      style={[
        styles.button,
        {
          backgroundColor: THEME.primary,
        },
      ]}
    >
      <Text style={{ ...TYPO.h5, color: "#fff" }}>Save</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        onCancel();
      }}
      style={[
        styles.button,
        {
          backgroundColor: "#ddd",
        },
      ]}
    >
      <View>
        <Text style={{ ...TYPO.h5 }}>Cancel</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  optionWrapper: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: "35%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});

export default ModalButtons;
