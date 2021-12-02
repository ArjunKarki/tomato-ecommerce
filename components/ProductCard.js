import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CONFIG } from "../constants/config";
import { THEME } from "../DynamicStyle/style";
import { hp } from "../constants/hp";
import { useNavigation, StackActions } from "@react-navigation/native";

const hori_width = CONFIG.width > 700 ? 4.5 : 2.5;
import placeholder from "../assets/images/placeholder.jpg";
import { useDispatch } from "react-redux";
import { SaveHistory } from "../redux/actions/HistoryAction";

const ProductCard = ({ product, onPress }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const images = product.images ? product.images : [];
  const pImage = images.length > 0 ? { uri: images[0] } : placeholder;

  const onClick = () => {
    dispatch(SaveHistory(product));
    navigation.dispatch(
      StackActions.push("ProductDetailScreen", { id: product.id })
    );
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        width: CONFIG.width / hori_width - 10,
        marginRight: 5,
        backgroundColor: THEME.card,
        paddingHorizontal: 5,
      }}
    >
      <Image
        source={pImage}
        resizeMode="contain"
        // style={{ width: CONFIG.width / hori_width - 20, height: 120 }}
        style={{
          width: "100%",
          height: 120,
        }}
      />
      <View>
        <Text
          numberOfLines={2}
          style={{ color: THEME.text_primary, marginTop: 5 }}
        >
          {product.name}
        </Text>
      </View>
      <View>
        <Text
          style={{ color: THEME.primary, fontWeight: "bold", marginTop: 5 }}
        >
          {hp.moneyFormat(product.price)} Ks
        </Text>
      </View>
      {product.store && (
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
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
};

ProductCard.defaultProps = {
  onPress: () => {},
  product: {},
};

export default ProductCard;
