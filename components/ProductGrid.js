import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CONFIG } from "../constants/config";
import { THEME } from "../DynamicStyle/style";
import { hp } from "../constants/hp";
import { useNavigation, StackActions } from "@react-navigation/native";
const hori_width = CONFIG.width > 700 ? 3 : 2;
import placeholder from "../assets/images/placeholder.jpg";
import { useDispatch } from "react-redux";
import { SaveHistory } from "../redux/actions/HistoryAction";
import CImage from "./CImage";
import Title from "./Title";

const ProductGrid = ({ products, onPress, title }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const pImage = images.length > 0 ? { uri: images[0] } : placeholder;

  let mRight = 0;

  const onClick = (product) => {
    dispatch(SaveHistory(product));
    navigation.push("ProductDetailScreen", { id: product.id });
  };

  return (
    <View style={{}}>
      {title && (
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            height: 38,
            backgroundColor: THEME.card,
          }}
        >
          <View
            style={{
              width: 4,
              height: 22,
              backgroundColor: THEME.primary,
              marginRight: 8,
            }}
          />
          <Text style={{ fontSize: 18 }}>{title}</Text>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        {products &&
          products.map((product, index) => {
            const images = product.images ? product.images : [];
            if (hori_width == 2) mRight = (index + 1) % 2 == 0 ? 0 : 5;
            else mRight = (index + 1) % 3 == 0 ? 0 : 5;

            return (
              // <ProductGrid key={index} product={item} index={index} />
              <TouchableOpacity
                key={index}
                onPress={() => onClick(product)}
                style={{
                  width: CONFIG.width / hori_width - 13,
                  // marginRight: mRight,
                  marginHorizontal: 1.5,
                  backgroundColor: THEME.card,
                  padding: 5,
                  marginBottom: 5,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    height: 200,
                    width: CONFIG.width / hori_width - 20,
                  }}
                >
                  <CImage imgUrl={images} />
                </View>
                <View>
                  <Text
                    numberOfLines={2}
                    style={{ color: THEME.text_primary, marginTop: 5 }}
                  >
                    {hp.strfix(product.name)}
                  </Text>
                </View>
                <View>
                  {product.type == "simple" &&
                    product.regular_price !== 0 &&
                    product.price !== product.regular_price && (
                      <Text
                        style={{
                          color: THEME.secondary,
                          fontFamily: "Roboto-Bold",
                          fontSize: 13,
                          textDecorationLine: "line-through",
                        }}
                      >
                        {hp.moneyFormat(product.regular_price)} ks
                      </Text>
                    )}
                  <Text
                    style={{
                      color: THEME.primary,
                      fontWeight: "bold",
                      marginTop: 5,
                    }}
                  >
                    {hp.moneyFormat(product.price)} Ks
                  </Text>
                </View>
                {product.store && (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require("../assets/dummy/stores/crown.jpeg")}
                    />
                    <Text style={{ color: THEME.text_secondary, fontSize: 12 }}>
                      {product.store.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
};

ProductGrid.defaultProps = {
  onPress: () => {},
  product: {},
};

export default ProductGrid;

const Styles = StyleSheet.create({
  boldText: {
    color: THEME.primary,
    fontWeight: "bold",
  },
});
