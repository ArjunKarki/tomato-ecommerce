import React from "react";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { View, TextPropTypes } from "react-native";
import { THEME } from "../DynamicStyle/style";
import { CONFIG } from "../constants";
let { width, height } = CONFIG;

const cat_width = width > 700 ? 10 : 5;

const Skeleton = () => {
  let media = [];

  for (let i = 0; i < 10; i++) {
    media.push(
      <PlaceholderMedia size={width / cat_width - 14} style={{ margin: 5 }} />
    );
  }

  return (
    <Placeholder Animation={Fade}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {media}
      </View>
    </Placeholder>
  );
};

export default Skeleton;
