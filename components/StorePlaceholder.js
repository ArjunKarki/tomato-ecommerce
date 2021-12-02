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

const StorePlaceholder = () => {
  let store = [];

  for (let i = 0; i < hori_width; i++) {
    store.push(
      <PlaceholderMedia
        key={i}
        size={width / hori_width - 14}
        style={{ margin: 5 }}
      />
    );
  }

  return (
    <Placeholder Animation={Fade}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 8,
          marginBottom: 10,
        }}
      >
        {store}
      </View>
    </Placeholder>
  );
};

export default StorePlaceholder;
