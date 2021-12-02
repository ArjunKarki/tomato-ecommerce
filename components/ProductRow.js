import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";

import { CONFIG } from "../constants/config";
import { THEME } from "../DynamicStyle/style";
import { hp } from "../constants/hp";
import { useNavigation, StackActions } from "@react-navigation/native";
import Icon from "@expo/vector-icons/Ionicons";
const hori_width = CONFIG.width > 700 ? 4.3 : 2.3;
import { useDispatch } from "react-redux";
import { SaveHistory } from "../redux/actions/HistoryAction";
import CImage from "./CImage";
import FlashDealCountDown from "./FlashDealCountDown";
import placeholder from "../assets/images/placeholder.jpg";
// import { CImage } from ".";

const ProductRow = ({ products, title, onSeeMore }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onClick = (item) => {
    dispatch(SaveHistory(item));
    if (onSeeMore !== "fromLiveSale") {
      navigation.dispatch(
        StackActions.push("ProductDetailScreen", { id: item.id })
      );
    } else {
      navigation.navigate({
        name: "ProductDetailScreen",
        params: {
          id: item.id,
        },
      });
    }
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <View style={styles.leftView} />
        {title && <Text style={{ fontSize: 18 }}>{title}</Text>}

        {title === "FLASH DEALS" && (
          <View
            style={{
              backgroundColor: "#000",
              marginLeft: 10,
              borderRadius: 4,
            }}
          >
            <FlashDealCountDown size={12} backgroundColor="rgba(0,0,0,0)" />
          </View>
        )}
        {onSeeMore !== "fromLiveSale" && onSeeMore && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onSeeMore}
          >
            <Text style={{ color: THEME.text_secondary }}>See More{"  "}</Text>
            <Icon
              size={16}
              style={{ marginTop: 3 }}
              name="ios-arrow-forward"
              color={THEME.secondary}
            />
            <Icon />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          renderItem={({ item, index }) => {
            const images = item.images ? item.images : [];
            const pImage = images.length > 0 ? { uri: images[0] } : placeholder;
            return (
              <TouchableOpacity
                onPress={() => onClick(item)}
                style={{
                  width: CONFIG.width / hori_width - 5,
                  marginRight: 5,
                  backgroundColor: THEME.card,
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    width: CONFIG.width / hori_width - 10,
                    height: 120,
                  }}
                >
                  <CImage imgUrl={images} />
                </View>
                <View>
                  <Text
                    numberOfLines={2}
                    style={{ color: THEME.text_primary, marginTop: 5 }}
                  >
                    {hp.strfix(item.name)}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                  }}
                >
                  {item.regular_price !== 0 &&
                    item.price !== item.regular_price && (
                      <Text
                        style={{
                          color: THEME.secondary,
                          fontFamily: "Roboto-Bold",
                          fontSize: 13,
                          textDecorationLine: "line-through",
                        }}
                      >
                        {hp.moneyFormat(item.regular_price)} ks
                      </Text>
                    )}
                  {/* {title === "FLASH DEALS" &&
                  item.type === "simple" &&
                  item.price != item.regular_price && (
                    <Text
                      style={{
                        color: THEME.secondary,
                        fontFamily: "Roboto-Bold",
                        fontSize: 13,
                        textDecorationLine: "line-through",
                      }}
                    >
                      {hp.moneyFormat(item.regular_price)} ks
                    </Text>
                  )} */}
                  <Text
                    style={{
                      color: THEME.primary,
                      fontFamily: "Roboto-Bold",
                    }}
                  >
                    {hp.moneyFormat(item.price)} Ks
                  </Text>
                </View>
                {item.store && (
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
                      {item.store.name}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

ProductRow.defaultProps = {
  products: [],
  // onSeeMore: () => {}
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 38,
    backgroundColor: THEME.card,
  },
  leftView: {
    width: 3,
    height: 22,
    backgroundColor: THEME.primary,
    marginRight: 8,
  },
});

export default ProductRow;
