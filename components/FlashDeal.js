import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  AsyncStorage,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CONFIG, hp } from "../constants";
import Icon from "@expo/vector-icons/Ionicons";
import placeholder from "../assets/images/placeholder.jpg";
import { useNavigation } from "@react-navigation/native";
import { THEME } from "../DynamicStyle/style";
import CImage from "./CImage";
import FlashDealCountDown from "./FlashDealCountDown";

const hori_width = CONFIG.width > 700 ? 4.5 : 2.5;

const FlashDeal = ({ products }) => {
  const navigation = useNavigation();
  const [currentCD, setCurrentCD] = useState(0);

  const onPress = (id) => {
    navigation.navigate("ProductDetailScreen", { id });
  };

  const onSeeMorePress = () => {
    navigation.navigate("CategoryDetail", {
      SCategory: { name: "Flash Deals" },
      countDown: { expired_date: currentCD },
    });
  };

  const onCDChange = (curr) => {
    setCurrentCD(curr);
  };

  return (
    <View>
      <View style={{ alignItems: "center", height: 70, marginTop: -7 }}>
        <Image
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
          source={require("../assets/images/ads/flashdealshd.jpg")}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.txt_white}>FLASH DEALS</Text>
          <View
            style={{
              backgroundColor: "#000",
              marginLeft: 10,
              borderRadius: 4,
            }}
          >
            <FlashDealCountDown
              size={12}
              backgroundColor="rgba(0,0,0,0)"
              textColor="#fff"
              onChange={onCDChange}
            />
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onSeeMorePress}
        >
          <Text style={{ color: THEME.card }}>See More{"  "}</Text>
          <Icon
            size={16}
            style={{ marginTop: 3 }}
            name="ios-arrow-forward"
            color={THEME.card}
          />
          <Icon />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginBottom: 10,
          backgroundColor: THEME.background,
          paddingVertical: 10,
          marginHorizontal: 8,
        }}
      >
        <FlatList
          horizontal={true}
          contentContainerStyle={{
            paddingHorizontal: 10,
            marginBottom: 5,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={products}
          renderItem={({ item, index }) => {
            const images = item.images ? item.images : [];
            const pImage = images.length > 0 ? { uri: images[0] } : placeholder;
            // if (item.regular_price != item.price && item.regular_price != 0) {

            return (
              <TouchableOpacity
                onPress={(id) => onPress(item.id)}
                style={{
                  width: CONFIG.width / hori_width - 10,
                  marginRight: 12,
                  backgroundColor: THEME.card,
                  paddingHorizontal: 5,
                }}
              >
                <View style={{ height: 120 }}>
                  <CImage imgUrl={images} />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  {item.price == item.regular_price &&
                  item.sale_price.length ? (
                    <Text style={styles.normal_text}>
                      {hp.moneyFormat(item.sale_price)} Ks
                    </Text>
                  ) : null}

                  {item.price !== item.regular_price ||
                  !item.sale_price.length ? (
                    <Text style={styles.normal_text}>
                      {hp.moneyFormat(item.price)} Ks
                    </Text>
                  ) : null}

                  {item.price != item.regular_price && item.regular_price != 0 && (
                    <Text style={styles.line_through}>
                      {hp.moneyFormat(item.regular_price)} Ks
                    </Text>
                  )}

                  {item.regular_price == item.price &&
                  item.sale_price.length ? (
                    <Text style={styles.line_through}>
                      {hp.moneyFormat(item.price)} Ks
                    </Text>
                  ) : null}

                </View>
                <View>
                  <Text
                    numberOfLines={2}
                    style={{ color: THEME.text_primary, marginTop: 5 }}
                  >
                    {hp.strfix(item.name)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
            // }
          }}
        />
      </View>
    </View>
  );
};

export default FlashDeal;

const styles = StyleSheet.create({
  txt_white: {
    color: "#fff",
    fontSize: 16,
  },
  normal_text: {
    color: THEME.primary,
    fontWeight: "bold",
    marginTop: 5,
    flex: 1,
  },
  line_through: {
    color: THEME.text_secondary,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 5,
    flex: 1,
    textDecorationLine: "line-through",
  }
});
