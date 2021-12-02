import React, { useState, useEffect, useRef } from "react";
import { View, SafeAreaView, Platform } from "react-native";
import { CONFIG, hp } from "../constants";
import { THEME } from "../DynamicStyle/style";

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from "rn-placeholder";

const ProductDetailPlaceholder = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <Placeholder
        Animation={Fade}
        style={{ backgroundColor: THEME.background }}
      >
        <PlaceholderLine
          height={CONFIG.height * 0.4}
          style={{ borderRadius: 0, marginBottom: 0 }}
        />
        <View style={{ marginTop: 10, marginHorizontal: 8 }}>
          <PlaceholderLine width={80} />
          <PlaceholderLine width={50} />

          <View style={{ marginTop: 15 }}>
            <PlaceholderLine width={20} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <PlaceholderLine width={60} />
              <PlaceholderLine width={20} />
            </View>
            <PlaceholderLine width={40} />
          </View>
          <View style={{ marginTop: 15 }}>
            <PlaceholderLine
              height={10}
              width={20}
              style={{ marginBottom: 10 }}
            />
            <PlaceholderLine
              height={50}
              style={{ marginBottom: 10, borderRadius: 5 }}
            />
          </View>
          <View style={{ marginTop: 15 }}>
            <PlaceholderLine
              height={10}
              width={20}
              style={{ marginBottom: 10 }}
            />
            <PlaceholderLine
              height={50}
              style={{ marginBottom: 10, borderRadius: 5 }}
            />
          </View>
          <PlaceholderLine height={50} width={30} style={{ borderRadius: 5 }} />
        </View>
      </Placeholder>
    </SafeAreaView>
  );
};

export default ProductDetailPlaceholder;
