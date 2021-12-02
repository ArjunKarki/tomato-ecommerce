import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { THEME } from "../DynamicStyle/style";

const Title = ({ name, onSeeMorePress, style }) => {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        },
        style,
      ]}
    >
      <Text style={{ fontFamily: "Roboto-Bold", color: THEME.primary }}>
        {name}
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onSeeMorePress}
      >
        <Text style={{ color: THEME.text_secondary }}>See More{"  "}</Text>
        <Icon
          size={16}
          style={{ marginTop: 3 }}
          name="ios-arrow-forward"
          color={THEME.secondary}
        />
        <Icon />
      </TouchableOpacity>
    </View>
  );
};

export default Title;

