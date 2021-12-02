import React from "react";
import { View } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { CONFIG } from "../constants";

const { width, height } = CONFIG;
const hori_width = width > 700 ? 5 : 3;

export const CategoryPlaceholder = () => {
  let category = [];
  for (let i = 0; i < hori_width; i++) {
    category.push(
      <View key={i}>
        <PlaceholderMedia
          size={width / hori_width - 10}
          style={{ marginRight: 5 }}
        />
        <PlaceholderLine
          width={width / hori_width - 40}
          style={{
            marginTop: 5,
            marginLeft: 1,
          }}
        />
      </View>
    );
  }
  return (
    <Placeholder Animation={Fade}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 8,
        }}
      >
        {category}
      </View>
    </Placeholder>
  );
};
export default CategoryPlaceholder;
