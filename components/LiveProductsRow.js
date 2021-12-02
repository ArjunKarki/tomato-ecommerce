import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { hp, CONFIG } from "../constants";
import { useNavigation, StackActions } from "@react-navigation/native";
import CImage from "./CImage";
import { THEME } from "../DynamicStyle/style";

const { width, height } = CONFIG;
const hori_width = width > 700 ? 4.5 : 2.5;

export const LiveProductsRow = ({ products, activeIndex }) => {
  const navigation = useNavigation();
  const FlatListRef = useRef((ref) => ref);

  useEffect(() => {
    if (activeIndex !== null && activeIndex > -1) {
      if (activeIndex < products.length) {
        FlatListRef.current.scrollToIndex({
          animated: true,
          index: activeIndex,
        });
        console.log("scroll to item completed!");
      }
    }
  }, [activeIndex]);

  return (
    <FlatList
      ref={FlatListRef}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={products}
      keyExtractor={(item, index) => item.name + index.toString()}
      renderItem={({ index, item }) => {
        const images = item.images ? item.images : [];
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProductDetailScreen", {
                id: item.id,
              });
            }}
            style={{
              marginRight: 5,
              backgroundColor: THEME.card,
              paddingHorizontal: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderWidth: 1,
                borderColor: "#ddd",
                borderStyle: "solid",
              }}
            >
              {/* Image */}
              <View
                style={{
                  width: (CONFIG.width * 20) / 100,
                  height: (CONFIG.width * 20) / 100,
                  marginRight: 5,
                  padding: 5,
                }}
              >
                <CImage imgUrl={images} />
              </View>

              {/* Info */}
              <View
                style={{
                  marginRight: 8,
                  paddingVertical: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    marginBottom: 5,
                  }}
                >
                  {hp.strfix(item.name)}
                </Text>
                {item.product_type === "simple" ? (
                  <Text
                    style={{
                      color: THEME.primary,
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {hp.moneyFormat(item.price)} Ks
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: THEME.primary,
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {item.price}
                  </Text>
                )}
                {item.price !== item.regular_price &&
                parseInt(item.regular_price) ? (
                  <Text
                    style={{
                      color: THEME.secondary,
                      fontFamily: "Roboto-Bold",
                      fontSize: 10,
                      textDecorationLine: "line-through",
                    }}
                  >
                    {hp.moneyFormat(item.regular_price)} ks
                  </Text>
                ) : (
                  <></>
                )}
              </View>

              {/* button */}
              <View
                style={{
                  backgroundColor: THEME.primary,
                  justifyContent: "center",
                  paddingHorizontal: 8,
                }}
              >
                <TouchableOpacity style={{
                  padding: 5,
                }}
                onPress={() => {
                  navigation.navigate("ProductDetailScreen", {
                    id: item.id,
                  });  
                }}
                >
                  <Text
                    style={{
                      fontFamily: "Roboto-Medium",
                      fontSize: 13,
                      color: "#fff",
                    }}
                  >
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
