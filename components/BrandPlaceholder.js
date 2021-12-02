import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
} from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";
import { FontAwesome } from "@expo/vector-icons";

const WIDTH = CONFIG.width;
const HEIGHT = CONFIG.height;

import { THEME, TYPO, width } from "../DynamicStyle/style";

import { CONFIG, hp } from "../constants";

const cat_width = WIDTH > 700 ? 10 : 5;
const hori_width = WIDTH > 700 ? 5 : 3;
const grid_width = WIDTH > 700 ? 3 : 2;

const BrandPlaceholder = ({ num }) => {
  let _placeholder = [];

  for (let i = 0; i < num; i++) {
    _placeholder.push(
      <Placeholder
        key={i}
        Animation={Fade}
        Left={() => <EachSide index={i} />}
        Right={() => <EachSide index={i} />}
      />
    );
  }
  return <View style={{ paddingHorizontal: 10 }}>{_placeholder}</View>;
};

const EachSide = (index) => (
  <View
    style={{
      width: WIDTH / 2 - 12,
      height: 160,
      borderRadius: 5,
      backgroundColor: THEME.white,
      marginRight: index % 2 == 0 ? 5 : 0,
      marginBottom: 8,
      marginTop: 8,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <PlaceholderMedia
      style={{
        width: (WIDTH / 2 - 12) / 2,
        height: 80,
      }}
    />
    <PlaceholderLine style={{ marginTop: 10 }} width={40} height={8} />
    <PlaceholderLine style={{ marginTop: -2 }} width={30} height={8} />
  </View>
);

export default BrandPlaceholder;
BrandPlaceholder.defaultProps = {
  num: 3,
};
