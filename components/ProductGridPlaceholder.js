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
const hori_width = width > 700 ? 3 : 2;

const ProductGridPlaceholder = () => {
  let product = [];
  for (let i = 0; i < 6; i++) {
    product.push(
      <View style={{ marginBottom: 5 }} key={i}>
        <PlaceholderMedia
          size={width / hori_width - 13}
          style={{ marginRight: i % 2 == 0 ? 6 : 0 }}
        />
        <PlaceholderLine
          width={80}
          height={10}
          style={{ marginTop: 5, marginLeft: 1, marginBottom: 2 }}
        />
        <PlaceholderLine
          width={60}
          height={10}
          style={{ marginTop: 5, marginLeft: 1, marginBottom: 2 }}
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
          flexWrap: "wrap",
        }}
      >
        {product}
      </View>
    </Placeholder>
  );
};
export default ProductGridPlaceholder;
