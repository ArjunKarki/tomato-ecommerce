import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { THEME } from "../DynamicStyle/style";
import { TextInput } from "react-native-gesture-handler";
const Quantity = ({ onPlus, onMinus, quantity, style }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onMinus} style={styles.minusButton}>
        <MaterialCommunityIcons
          name={"minus"}
          size={20}
          color={THEME.text_primary}
        />
      </TouchableOpacity>

      <View style={styles.txtInput}>
        {/* <TextInput value={quantity.toString()} style={{ textAlign: "center" }} /> */}
        <Text style={{ textAlign: "center" }}>{quantity}</Text>
      </View>
      <TouchableOpacity onPress={onPlus} style={styles.plusButton}>
        <MaterialCommunityIcons
          name={"plus"}
          size={20}
          color={THEME.text_primary}
        />
      </TouchableOpacity>
    </View>
  );
};

Quantity.defaultProps = {
  onMinus: () => { },
  onPlus: () => { },
  quantity: "1",
};

export default Quantity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: THEME.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
    marginTop: 5,
  },

  minusButton: {
    flex: 1,
  },
  plusButton: {
    flex: 1,
    alignItems: "flex-end",
  },
  txtInput: {
    flex: 1,
  },
});
