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

const ProductRowPlaceholder = () => {
  let product = [];
  for (let i = 0; i < hori_width; i++) {
    product.push(
      <View key={i}>
        <PlaceholderMedia
          size={width / hori_width - 10}
          style={{ marginRight: 5 }}
        />
        <PlaceholderLine
          width={width / hori_width - 40}
          style={{ marginTop: 5, marginLeft: 1, marginBottom: 2 }}
        />
        <PlaceholderLine
          width={width / hori_width - 90}
          height={10}
          style={{ marginLeft: 1, marginBottom: 2 }}
        />
        <PlaceholderLine
          width={width / hori_width - 70}
          height={10}
          style={{ marginLeft: 1 }}
        />
      </View>
    );
  }

  return (
    <Placeholder Animation={Fade}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 10,
          marginBottom: 6,
        }}
      >
        {product}
      </View>
    </Placeholder>
  );
};
export default ProductRowPlaceholder;
