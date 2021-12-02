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
const cat_width = width > 700 ? 10 : 5;

const catIconPlaceholder = () => {
  let media = [];

  for (let i = 0; i < 10; i++) {
    media.push(
      <PlaceholderMedia
        key={i}
        size={width / cat_width - 14}
        style={{ margin: 5 }}
      />
    );
  }

  return (
    <Placeholder Animation={Fade}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 8,
        }}
      >
        {media}
      </View>
    </Placeholder>
  );
};

export default catIconPlaceholder;
