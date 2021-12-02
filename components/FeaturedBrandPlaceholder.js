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
  return (
    <Placeholder style={{ paddingHorizontal: 10 }} Animation={Fade}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: WIDTH / 2 - 30,
            height: 180,
            padding: 10,

            marginRight: 10,
          }}
        >
          <PlaceholderLine width={WIDTH / 2 - 100} height={150} />
        </View>
        <View
          style={{
            width: WIDTH / 2 - 30,
            height: 180,
            padding: 10,
          }}
        >
          <PlaceholderLine width={WIDTH / 2 - 100} height={150} />
        </View>
      </View>
    </Placeholder>
  );
};

const EachSide = (index) => (
  <View
    style={{
      width: WIDTH / 2 - 12,
      height: 120,
      borderWidth: 0.2,
      borderColor: THEME.secondary,
      borderRadius: 5,
      marginRight: 5,
      marginBottom: 8,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <PlaceholderMedia
      style={{
        width: (WIDTH / 2 - 12) / 2,
        height: 50,
      }}
    />
    <PlaceholderLine style={{ marginTop: 5 }} width={40} height={10} />
    <PlaceholderLine style={{ marginTop: -5 }} width={30} height={10} />
  </View>
);

export default BrandPlaceholder;
BrandPlaceholder.defaultProps = {
  num: 3,
};
